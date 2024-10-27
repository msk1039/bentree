import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();

  try {
    const body = await request.json();
    const { email, password, full_name, username } = body;

    // Input validation
    if (!email || !password || !full_name || !username) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if username is already taken
    const { data: existingUser, error: usernameCheckError } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (usernameCheckError && usernameCheckError.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Username check error:', usernameCheckError);
      return NextResponse.json({ error: 'Error checking username availability' }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
    }

    // Create a new user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
    }

    // Create or update the profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        full_name,
        username,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error('Profile error:', profileError);
      return NextResponse.json({ error: 'Profile creation failed', details: profileError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Signup successful',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username,
        full_name,
      },
    });

  } catch (error) {
    console.error('Unexpected error during signup:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}