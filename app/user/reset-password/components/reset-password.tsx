'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MailIcon, LockIcon, Loader2Icon, KeyIcon } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      setIsVerified(true);
    }
  }, [searchParams]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'recovery'
      });

      if (error) throw error;

      setIsVerified(true);
      setMessage({
        text: 'OTP verified successfully. You can now reset your password.',
        type: 'success'
      });
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : 'Failed to verify OTP',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({
        text: 'Passwords do not match',
        type: 'error'
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setMessage({
        text: 'Password updated successfully! Redirecting to login...',
        type: 'success'
      });

      await supabase.auth.signOut();
      
      setTimeout(() => {
        router.push('/user/login');
      }, 2000);

    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : 'Failed to reset password',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center px-4 md:px-8 py-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Reset Password</h1>
            <p className="text-lg text-gray-500">
              {!isVerified 
                ? "Enter your email and OTP to continue" 
                : "Choose your new password"}
            </p>
          </div>

          {!isVerified ? (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              {message && (
                <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center bg-gray-100 rounded-lg p-3 w-full">
                  <MailIcon className="text-gray-400" size={18} />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="bg-transparent outline-none text-gray-500 flex-grow ml-2"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <div className="flex items-center bg-gray-100 rounded-lg p-3 w-full">
                  <KeyIcon className="text-gray-400" size={18} />
                  <input
                    id="otp"
                    type="number"
                    placeholder="Enter OTP code"
                    className="bg-transparent outline-none text-gray-500 flex-grow ml-2"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white rounded-lg p-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2" size={18} />
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </Button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleReset}>
              {message && (
                <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="flex items-center bg-gray-100 rounded-lg p-3 w-full">
                  <LockIcon className="text-gray-400" size={18} />
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent outline-none text-gray-500 flex-grow ml-2"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="flex items-center bg-gray-100 rounded-lg p-3 w-full">
                  <LockIcon className="text-gray-400" size={18} />
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent outline-none text-gray-500 flex-grow ml-2"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white rounded-lg p-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2" size={18} />
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
      <div className="hidden md:block bg-gray-50" />
    </div>
  );
}