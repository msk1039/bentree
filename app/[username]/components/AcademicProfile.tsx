"use client";

import { useEffect, useState } from 'react';
import { UserIcon, Loader2Icon } from 'lucide-react';
import { Profile } from '@/app/types/profile';

type AcademicProfileProps = {
  username: string;
};

export default function AcademicProfile({ username }: AcademicProfileProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        if (!response.ok) throw new Error('Failed to load profile');
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="animate-spin" size={24} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="max-w-md text-center">
      <div className="mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
            <UserIcon className="h-12 w-12 text-gray-400" />
          </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {profile.full_name}&apos;s Profile
      </h2>
      <p className="text-gray-600 mb-4">
        Connect and collaborate with {profile.full_name} on our platform.
      </p>

    </div>
  );
}
