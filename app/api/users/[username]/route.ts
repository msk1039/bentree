import { createClient } from '@/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import DOMPurify from 'isomorphic-dompurify';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ username: string }>;
}

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = createClient();
    const { username } = await context.params;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      return NextResponse.json({ available: true }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = createClient();
    const { username } = await context.params;
    const updates = await req.json();

    // Sanitize the HTML content
    if (updates.bio) {
      updates.bio = DOMPurify.sanitize(updates.bio, {
        ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 'br'],
        ALLOWED_ATTR: []
      });
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('username', username)
      .eq('id', user.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}