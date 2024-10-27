'use client';

import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LockIcon, MailIcon, Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'An error occurred during login');
      }

      router.push('/user/profile');
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center px-4 md:px-8 py-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Welcome back!</h1>
            <p className="text-lg text-gray-500">Sign in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
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
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/user/forgot-password" className="text-sm text-gray-500 hover:text-gray-700">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white rounded-lg p-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin mr-2" size={18} />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link href="/user/signup" className="text-gray-900 font-semibold hover:text-gray-700">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block bg-gray-50" />
    </div>
  );
};

export default LoginForm;