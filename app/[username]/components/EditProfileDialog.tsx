"use client";

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditIcon, XIcon, Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from './ui/RichTextEditor';
import { Profile } from '@/app/types/profile';
import { toast } from 'sonner';

interface EditProfileDialogProps {
  username: string;
  children: React.ReactNode;
}

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  username
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Profile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${username}`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      toast.error('Failed to load profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/users/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      toast.success('Profile updated successfully');
      setIsOpen(false);
      
      // Refresh the page data without full reload
      window.location.reload();
    } catch (err) {
      toast.error('Failed to update profile');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Centered Floating Edit Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <Button
          onClick={() => {
            fetchProfile();
            setIsOpen(true);
          }}
          className="h-14 px-8 rounded-full bg-black hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-lg font-medium"
        >
          <EditIcon className="mr-3 h-5 w-5" />
          Edit Profile
        </Button>
      </motion.div>

      {/* Edit Dialog */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ 
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: 0.5
              }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 overflow-hidden"
            >
              <div className="max-w-3xl mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full hover:bg-gray-100"
                  >
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2Icon className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                      <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">
                        Full Name
                      </Label>
                      <Input
                        id="full_name"
                        value={formData?.full_name || ''}
                        onChange={(e) => setFormData(prev => prev ? { ...prev, full_name: e.target.value } : null)}
                        placeholder="Your full name"
                        className="h-12 text-lg"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                        Bio
                      </Label>
                      <RichTextEditor
                        content={formData?.bio || ''}
                        onChange={(content) => setFormData(prev => prev ? { ...prev, bio: content } : null)}
                        placeholder="Tell us about yourself"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={formData?.website || ''}
                        onChange={(e) => setFormData(prev => prev ? { ...prev, website: e.target.value } : null)}
                        placeholder="https://your-website.com"
                        className="h-12 text-lg"
                      />
                    </div>

                    <div className="flex space-x-4 pt-6">
                      <Button
                        type="submit"
                        className="flex-1 h-14 text-lg font-medium bg-black hover:bg-gray-900 text-white transition-colors"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2Icon className="animate-spin mr-3 h-5 w-5" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 h-14 text-lg font-medium border-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};