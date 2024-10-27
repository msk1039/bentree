"use client";

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2Icon, 
  UserIcon, 
  EditIcon, 
  GlobeIcon,
  CalendarIcon 
} from 'lucide-react';
import { Profile } from '@/app/types/profile';
import { AvailableUsername } from './AvailableUsername';

export type ProfileComponentProps = {
  username: string;
  currentUser?: {
    id: string;
  };
};

export const ProfileComponent: React.FC<ProfileComponentProps> = ({ 
  username, 
  currentUser 
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Profile>>({});


  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/${username}`);
      if (response.status === 404) {
        setError('available');
        setLoading(false);
        return;
      }
      const data = await response.json();
      setProfile(data);
      setFormData(data);
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="animate-spin" size={24} />
      </div>
    );
  }

  if (error === 'available') {
    return <AvailableUsername username={username} />;
  }

  const isOwner = currentUser && profile?.username === username;
  const joinDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : null;

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center px-4 md:px-8 py-8 bg-white">
        <div className="w-full max-w-md">
          {error && error !== 'available' && (
            <Alert className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-center mb-8">
            <div className="mb-6">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.username}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                  <UserIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            <h1 className="text-3xl font-bold text-black mb-2">
              {profile?.full_name || `@${username}`}
            </h1>
            {profile?.full_name && (
              <p className="text-gray-500 mb-2">@{username}</p>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name || ''}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://your-website.com"
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  className="flex-1 bg-black hover:bg-gray-800 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2Icon className="animate-spin mr-2" size={18} />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {profile?.bio && (
                <p className="text-gray-600 text-center">{profile.bio}</p>
              )}

              <div className="space-y-3">
                {profile?.website && (
                  <div className="flex items-center justify-center text-gray-500">
                    <GlobeIcon className="h-4 w-4 mr-2" />
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-700"
                    >
                      {new URL(profile.website).hostname}
                    </a>
                  </div>
                )}

                {joinDate && (
                  <div className="flex items-center justify-center text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>Joined {joinDate}</span>
                  </div>
                )}
              </div>

              {isOwner && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900"
                >
                  <EditIcon className="mr-2" size={18} />
                  Edit Profile
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="h-full flex items-center justify-center p-8">
          <div className="max-w-md">
            {profile?.full_name && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{profile.full_name}&apos;s Profile</h2>
                <p className="text-gray-600">
                  Connect and collaborate with {profile.full_name} on our platform.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
