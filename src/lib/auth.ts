import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

// Use environment variable for JWT secret (add to .env.local)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
);

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123'
};

export interface AdminSession {
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

// Create JWT token
export async function createAdminToken(username: string): Promise<string> {
  return await new SignJWT({ username, isAdmin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

// Verify JWT token
export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    // Type guard to ensure payload has required properties
    if (payload && typeof payload === 'object' && 'username' in payload && 'isAdmin' in payload) {
      return {
        username: payload.username as string,
        isAdmin: payload.isAdmin as boolean,
        iat: payload.iat as number,
        exp: payload.exp as number
      };
    }
    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Authenticate admin credentials
export function authenticateAdmin(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

// Extract token from request
export function getTokenFromRequest(request: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try cookie as fallback
  const cookieToken = request.cookies.get('admin_token')?.value;
  return cookieToken || null;
}

// Middleware function to protect API routes
export async function requireAuth(request: NextRequest): Promise<AdminSession | null> {
  const token = getTokenFromRequest(request);
  
  if (!token) {
    return null;
  }

  return await verifyAdminToken(token);
}

// Generate secure session ID
export function generateSessionId(): string {
  return crypto.randomUUID();
}

// Hash password (for future use)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
} 