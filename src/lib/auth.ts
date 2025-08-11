import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

// Enhanced JWT secret with better security
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-with-at-least-32-chars'
);

// Admin credentials with hashed password support
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123', // Will be hashed in production
  email: process.env.ADMIN_EMAIL || 'admin@vtech.com'
};

export interface AdminSession {
  username: string;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
  sessionId: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// Enhanced token creation with session management
export async function createAdminToken(
  username: string, 
  email: string, 
  rememberMe = false
): Promise<{ token: string; sessionId: string }> {
  const sessionId = generateSessionId();
  const expirationTime = rememberMe ? '30d' : '24h';
  
  const token = await new SignJWT({ 
    username, 
    email, 
    isAdmin: true, 
    sessionId 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(JWT_SECRET);

  return { token, sessionId };
}

// Enhanced token verification
export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    if (payload && typeof payload === 'object' && 
        'username' in payload && 
        'email' in payload && 
        'isAdmin' in payload &&
        'sessionId' in payload) {
      return {
        username: payload.username as string,
        email: payload.email as string,
        isAdmin: payload.isAdmin as boolean,
        iat: payload.iat as number,
        exp: payload.exp as number,
        sessionId: payload.sessionId as string
      };
    }
    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Enhanced authentication with better security
export async function authenticateAdmin(username: string, password: string): Promise<boolean> {
  try {
    // Check username
    if (username !== ADMIN_CREDENTIALS.username) {
      return false;
    }

    // In production, you should hash passwords
    // For now, we'll do simple comparison but add bcrypt support
    if (process.env.NODE_ENV === 'production' && process.env.ADMIN_PASSWORD_HASH) {
      return await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    }
    
    return password === ADMIN_CREDENTIALS.password;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}

// Enhanced token extraction with multiple sources
export function getTokenFromRequest(request: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try cookie as fallback
  const cookieToken = request.cookies.get('admin_token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  // Try session storage token (for API calls)
  const sessionToken = request.headers.get('x-admin-token');
  return sessionToken || null;
}

// Enhanced auth middleware
export async function requireAuth(request: NextRequest): Promise<AdminSession | null> {
  const token = getTokenFromRequest(request);
  
  if (!token) {
    return null;
  }

  const session = await verifyAdminToken(token);
  
  // Additional security checks
  if (!session || !session.isAdmin) {
    return null;
  }

  return session;
}

// Generate secure session ID
export function generateSessionId(): string {
  return crypto.randomUUID() + '-' + Date.now().toString(36);
}

// Hash password utility
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Rate limiting helper
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);
  
  if (!attempt) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Reset after 15 minutes
  if (now - attempt.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Allow max 5 attempts
  if (attempt.count >= 5) {
    return false;
  }
  
  attempt.count++;
  attempt.lastAttempt = now;
  return true;
}

// Session management
const activeSessions = new Set<string>();

export function addActiveSession(sessionId: string): void {
  activeSessions.add(sessionId);
}

export function removeActiveSession(sessionId: string): void {
  activeSessions.delete(sessionId);
}

export function isSessionActive(sessionId: string): boolean {
  return activeSessions.has(sessionId);
}

export { ADMIN_CREDENTIALS };

