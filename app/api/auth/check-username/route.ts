import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const RATE_LIMIT_DURATION = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // Max requests per minute

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function GET(request: Request) {
  try {
    // Get client IP
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    // Rate limiting check
    const now = Date.now();
    const userRateLimit = rateLimitMap.get(ip);

    if (userRateLimit) {
      if (now - userRateLimit.timestamp < RATE_LIMIT_DURATION) {
        if (userRateLimit.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
        userRateLimit.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    // Clean up old entries every hour
    if (now % (60 * 60 * 1000) < 1000) {
      for (const [key, value] of rateLimitMap.entries()) {
        if (now - value.timestamp > RATE_LIMIT_DURATION) {
          rateLimitMap.delete(key);
        }
      }
    }

    // Get username from query
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json({ 
        error: 'Invalid username format',
        available: false 
      }, { status: 400 });
    }

    const supabase = createClient();

    // Check if username exists
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Error checking username:', error);
      return NextResponse.json(
        { error: 'Error checking username availability' },
        { status: 500 }
      );
    }

    return NextResponse.json({ available: !data });

  } catch (error) {
    console.error('Unexpected error checking username:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}