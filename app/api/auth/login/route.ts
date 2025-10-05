import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/cosmic';
import { verifyPassword, createToken, setSessionCookie } from '@/lib/auth';
import { AuthResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json<AuthResponse>(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json<AuthResponse>(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.metadata.password_hash);
    if (!isValid) {
      return NextResponse.json<AuthResponse>(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session
    const token = await createToken({
      userId: user.id,
      email: user.metadata.email,
      firstName: user.metadata.first_name,
      lastName: user.metadata.last_name
    });

    await setSessionCookie(token);

    return NextResponse.json<AuthResponse>({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        firstName: user.metadata.first_name,
        lastName: user.metadata.last_name,
        email: user.metadata.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<AuthResponse>(
      { success: false, message: 'Failed to login' },
      { status: 500 }
    );
  }
}