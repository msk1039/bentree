import { createClient } from '@/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import DOMPurify from 'isomorphic-dompurify';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest
) {
  const supabase = createClient();
  const { full_name, bio, website } = await req.json();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Validate required fields
  if (!full_name || !website) {
    return NextResponse.json({ error: 'Full name and website are required' }, { status: 400 });
  }

  // Sanitize the HTML content
  const sanitizedBio = bio ? DOMPurify.sanitize(bio, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 'br'],
    ALLOWED_ATTR: []
  }) : '';

  // Check if the user already has a profile
  const { data: existingProfile, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116: No rows found
    console.error('Error fetching existing profile:', fetchError);
    return NextResponse.json({ error: 'Error checking existing profile' }, { status: 500 });
  }

  if (existingProfile) {
    return NextResponse.json({ error: 'Profile already exists' }, { status: 400 });
  }

  // Create new profile
  const { data: newProfile, error: insertError } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      username: user.id, // Assuming username is the same as user ID initially
      full_name,
      bio: sanitizedBio,
      website
    })
    .single();

  if (insertError) {
    console.error('Error creating profile:', insertError);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(newProfile, { status: 201 });
}
