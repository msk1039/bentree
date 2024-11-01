// page.tsx
import { createClient } from '@/app/utils/supabase/server';
import { ProfileComponent } from '@/app/[username]/components/ProfileComponent';
import { AvailableUsername } from './components/AvailableUsername';
import AcademicProfile from './components/AcademicProfile';
import { ActionButton } from './components/ui/ActionButton';
import { Suspense } from 'react';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AnimatedLayout, AnimatedSection } from './components/ui/AnimatedLayout';

type PageProps = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;
  // We can await searchParams if needed
  // const searchParamsData = await searchParams;
  
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const currentUser = user ? { id: user.id } : undefined;
  const isOwner = currentUser?.id === username;

  // Server-side profile check
  const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/${encodeURIComponent(username)}`);
  
  // If profile doesn't exist, render AvailableUsername
  if (profileResponse.status === 404) {
    return <AvailableUsername username={username} />;
  }

  // If there's an error, show error state
  if (!profileResponse.ok) {
    return (
      <AnimatedLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <AnimatedSection>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
              <p className="text-gray-600">Failed to load profile</p>
            </div>
          </AnimatedSection>
        </div>
      </AnimatedLayout>
    );
  }

  // If profile exists, render the full profile page
  return (
    <AnimatedLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="h-screen flex flex-col p-4 md:p-8 gap-4">
          <div className="flex-grow grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 h-full">
              <AnimatedSection>
                <div className="bg-white rounded-2xl shadow-sm h-full overflow-y-auto">
                  <div className="flex flex-col items-center p-4">
                    <Suspense fallback={<LoadingSpinner />}>
                      <ProfileComponent 
                        username={username} 
                        currentUser={currentUser}
                      />
                    </Suspense>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="md:col-span-8 h-full">
              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-2xl shadow-sm h-full overflow-y-auto">
                  <div className="flex flex-col items-center p-4">
                    <Suspense fallback={<LoadingSpinner />}>
                      <AcademicProfile username={username} />
                    </Suspense>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          <AnimatedSection delay={0.4}>
            <ActionButton 
              isOwner={isOwner} 
              currentUser={currentUser} 
              username={username} 
            />
          </AnimatedSection>
        </div>
      </div>
    </AnimatedLayout>
  );
}