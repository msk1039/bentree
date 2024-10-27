'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MailIcon, Loader2Icon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setMessage({
        text: 'Please check your email for the OTP code. You will need this code to reset your password.',
        type: 'success'
      });

      setTimeout(() => {
        router.push('/user/reset-password');
      }, 3000);

    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : 'Failed to send reset instructions',
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
            <h1 className="text-3xl font-bold text-black mb-2">Forgot Password?</h1>
            <p className="text-lg text-gray-500">
              Enter your email to receive reset instructions
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {message && (
              <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
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

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white rounded-lg p-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin mr-2" size={18} />
                  Sending...
                </> 
              ) : (
                'Send Reset Instructions'
              )}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Remember your password?{' '}
              <Link href="/user/login" className="text-gray-900 font-semibold hover:text-gray-700">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block bg-gray-50" />
    </div>
  );
}