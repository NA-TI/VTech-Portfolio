import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Use service role for admin actions (bypass RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    if (!status || !['pending', 'read', 'replied'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be pending, read, or replied' },
        { status: 400 }
      );
    }

    // Update the message status
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message status updated successfully',
      data 
    });
  } catch (error) {
    console.error('Contact update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete the message
    const { error } = await supabaseAdmin
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Contact delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 