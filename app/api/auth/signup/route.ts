import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '@/lib/cosmic';
import { hashPassword, createToken, setSessionCookie } from '@/lib/auth';
import { AuthResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, confirmPassword } = body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json<AuthResponse>(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json<AuthResponse>(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json<AuthResponse>(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json<AuthResponse>(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const newUser = await createUser({
      firstName,
      lastName,
      email,
      passwordHash
    });

    // Create session
    const token = await createToken({
      userId: newUser.id,
      email: newUser.metadata.email,
      firstName: newUser.metadata.first_name,
      lastName: newUser.metadata.last_name
    });

    await setSessionCookie(token);

    return NextResponse.json<AuthResponse>({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        firstName: newUser.metadata.first_name,
        lastName: newUser.metadata.last_name,
        email: newUser.metadata.email
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json<AuthResponse>(
      { success: false, message: 'Failed to create account' },
      { status: 500 }
    );
  }
}