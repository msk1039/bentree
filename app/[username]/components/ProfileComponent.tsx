"use client";

import { useCallback, useEffect, useState } from 'react';
import { 
  UserIcon, 
  GlobeIcon,
  CalendarIcon,
  Loader2Icon
} from 'lucide-react';
import { Profile } from '@/app/types/profile';
import { Alert, AlertDescription } from '@/components/ui/alert';

export type ProfileComponentProps = {
  username: string;
  currentUser?: {
    id: string;
  };
};

export const ProfileComponent: React.FC<ProfileComponentProps> = ({ 
  username
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!username?.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/${encodeURIComponent(username)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load profile`);
      }
      
      const data = await response.json();
      
      if (!data?.username) {
        throw new Error('Invalid profile data received');
      }
      
      setProfile(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load profile';
      setError(errorMessage);
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="animate-spin" size={24} />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-center px-4 md:px-8 py-8 bg-white h-full">
        <div className="w-full max-w-md">
          {profile && (
            <>
              <div className="text-center mb-8">
                <div className="mb-6">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={`${profile.username}'s avatar`}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/default-avatar.png';
                      }}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                      <UserIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-black mb-2">
                  {profile.full_name || `@${profile.username}`}
                </h1>
                {profile.full_name && (
                  <p className="text-gray-500 mb-2">@{profile.username}</p>
                )}
              </div>

              <div className="space-y-6">
                {profile.bio && (
                  <div 
                    className="text-gray-600 text-center prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={createMarkup(profile.bio)}
                  />
                )}

                <div className="space-y-3">
                  {profile.website && (
                    <div className="flex items-center justify-center text-gray-500">
                      <GlobeIcon className="h-4 w-4 mr-2" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-700"
                      >
                        {(() => {
                          try {
                            return new URL(profile.website).hostname;
                          } catch {
                            return profile.website;
                          }
                        })()}
                      </a>
                    </div>
                  )}

                  {profile.created_at && (
                    <div className="flex items-center justify-center text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>
                        Joined {new Date(profile.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};