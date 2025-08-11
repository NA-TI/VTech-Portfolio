import { NextRequest, NextResponse } from 'next/server';
import { 
  authenticateAdmin, 
  createAdminToken, 
  checkRateLimit, 
  addActiveSession,
  type LoginCredentials 
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many login attempts. Please try again in 15 minutes.' 
        },
        { status: 429 }
      );
    }

    const body: LoginCredentials = await request.json();
    const { username, password, rememberMe = false } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Authenticate
    const isValid = await authenticateAdmin(username, password);
    
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create token and session
    const { token, sessionId } = await createAdminToken(
      username, 
      'admin@vtech.com', 
      rememberMe
    );
    
    // Track active session
    addActiveSession(sessionId);

    // Create response with secure cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        username,
        email: 'admin@vtech.com',
        isAdmin: true
      }
    });

    // Set secure HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 24 hours
      path: '/'
    };

    response.cookies.set('admin_token', token, cookieOptions);
    response.cookies.set('admin_session_id', sessionId, cookieOptions);

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

