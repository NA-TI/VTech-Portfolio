import { NextRequest, NextResponse } from 'next/server';
import { removeActiveSession, getTokenFromRequest, verifyAdminToken } from '@/lib/auth';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Get session info for cleanup
    const token = getTokenFromRequest(request);
    if (token) {
      const session = await verifyAdminToken(token);
      if (session) {
        removeActiveSession(session.sessionId);
      }
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful'
    });

    // Clear cookies
    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    response.cookies.set('admin_session_id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Support GET for logout links
  return POST(request);
}

