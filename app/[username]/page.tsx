import { createClient } from '@/app/utils/supabase/server';
import { ProfileComponent } from '@/app/[username]/components/ProfileComponent';

export default async function UserProfilePage({ 
  params 
}: { 
  params: Promise<{ username: string }> 
}) {
  // Await the params object before destructuring it
  const { username } = await params;

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Transform user to match the expected type
  const currentUser = user ? { id: user.id } : undefined;

  return (
    <div>
      <ProfileComponent 
        username={username} 
        currentUser={currentUser}
      />
    </div>
  );
}