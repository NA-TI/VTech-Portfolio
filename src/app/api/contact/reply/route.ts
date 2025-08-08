import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
// Use service role for admin reads/updates (bypass RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize Resend with error handling
let resend: Resend;
try {
  resend = new Resend(process.env.RESEND_API_KEY);
} catch (error) {
  console.error('Failed to initialize Resend:', error);
  resend = null as any;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Reply API called');
    
    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed:', { messageId: body.messageId, subject: body.subject, hasMessage: !!body.message });
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body', details: parseError instanceof Error ? parseError.message : 'Unknown parse error' },
        { status: 400 }
      );
    }

    const { messageId, subject, message } = body;

    // Debug: Log environment variables (without exposing the full API key)
    console.log('Environment check:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyLength: process.env.RESEND_API_KEY?.length,
      fromEmail: process.env.FROM_EMAIL,
      hasFromEmail: !!process.env.FROM_EMAIL
    });

    // Validate input
    if (!messageId || !subject || !message) {
      console.error('Missing required fields:', { messageId: !!messageId, subject: !!subject, message: !!message });
      return NextResponse.json(
        { error: 'Message ID, subject, and message are required' },
        { status: 400 }
      );
    }

    // Check if Resend is properly initialized
    if (!resend) {
      console.error('Resend not initialized');
      return NextResponse.json(
        { error: 'Email service not properly configured' },
        { status: 500 }
      );
    }

    console.log('Fetching original message with ID:', messageId);

    // Get the original message to get sender's email
    const { data: originalMessage, error: fetchError } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .eq('id', messageId)
      .single();

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Original message not found', details: fetchError.message },
        { status: 404 }
      );
    }

    if (!originalMessage) {
      console.error('No message found with ID:', messageId);
      return NextResponse.json(
        { error: 'Original message not found' },
        { status: 404 }
      );
    }

    console.log('Original message found:', { name: originalMessage.name, email: originalMessage.email });
    console.log('Attempting to send email to:', originalMessage.email);

    // Use default Resend email to avoid domain verification issues
    const fromEmail = 'onboarding@resend.dev';

    // Send email reply using Resend
    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: originalMessage.email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Reply to Your Contact Form Message</h2>
          <p style="color: #666; margin-bottom: 20px;">
            Hi ${originalMessage.name},
          </p>
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;"><strong>Your original message:</strong></p>
            <p style="margin: 10px 0 0 0; color: #333;">${originalMessage.message}</p>
          </div>
          <div style="margin: 20px 0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #888; font-size: 12px;">
            This email was sent in response to your contact form submission.
          </p>
        </div>
      `,
      text: `Hi ${originalMessage.name},\n\nYour original message:\n${originalMessage.message}\n\n---\n\n${message}`,
    });

    if (emailResult.error) {
      console.error('Resend error details:', emailResult.error);
      
      // Better error handling - check if message property exists
      const errorMessage = emailResult.error.message || emailResult.error.name || 'Unknown email error';
      let specificError = 'Failed to send email reply';
      
      if (errorMessage.includes('domain')) {
        specificError = 'Email domain not verified. Please verify your email domain in Resend.';
      } else if (errorMessage.includes('unauthorized') || emailResult.error.name === 'validation_error') {
        specificError = 'Email sending failed. Using default email service.';
      } else if (errorMessage.includes('rate limit')) {
        specificError = 'Rate limit exceeded. Please try again later.';
      }
      
      return NextResponse.json(
        { error: specificError, details: errorMessage },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', emailResult.data?.id);

    // Update message status to replied
    const { error: updateError } = await supabaseAdmin
      .from('contact_messages')
      .update({ status: 'replied' })
      .eq('id', messageId);

    if (updateError) {
      console.error('Update error:', updateError);
      // Don't fail the whole request if status update fails
      console.warn('Failed to update message status, but email was sent');
    }

    return NextResponse.json({
      success: true,
      message: 'Reply sent successfully',
      emailId: emailResult.data?.id
    });

  } catch (error) {
    console.error('Reply API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 