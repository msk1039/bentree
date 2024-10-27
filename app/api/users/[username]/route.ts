import { createClient } from '@/app/utils/supabase/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
) {
  const supabase = createClient();
  const username = req.nextUrl.pathname.split('/').pop();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error) {
    return Response.json({ available: true }, { status: 404 });
  }

  return Response.json(profile);
}

export async function PUT(
  req: NextRequest,
) {
  const supabase = createClient();
  const username = req.nextUrl.pathname.split('/').pop();
  const updates = await req.json();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    return Response.json({ error: userError.message }, { status: 401 });
  }

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('username', username)
    .eq('user_id', user.id)
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(profile);
}