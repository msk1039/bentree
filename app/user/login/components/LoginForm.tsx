'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LockIcon, MailIcon, Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  
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
        // Handle specific error cases
        switch (response.status) {
          case 400:
            toast.error('Invalid credentials', {
              description: 'Please check your email and password and try again.',
              duration: 5000,
            });
            break;
          case 401:
            toast.error('Invalid credentials', {
              description: 'Please check your email and password and try again.',
              duration: 5000,
            });
            break;
          case 429:
            toast.error('Too many attempts', {
              description: 'Please wait a few minutes before trying again.',
              duration: 5000,
            });
            break;
          case 503:
            toast.error('Service unavailable', {
              description: 'Our servers are currently experiencing issues. Please try again later.',
              duration: 5000,
            });
            break;
          default:
            toast.error('Login failed', {
              description: result.error || 'An unexpected error occurred. Please try again.',
              duration: 5000,
            });
        }
        return;
      }
  
      // Fetch user profile data
      const userResponse = await fetch('/api/users/me');
      const userData = await userResponse.json();
  
      if (!userResponse.ok) {
        toast.error('Failed to fetch user data', {
          description: 'An unexpected error occurred. Please try again.',
          duration: 5000,
        });
        return;
      }
  
      // Show success toast
      toast.success('Welcome back!', {
        description: 'Successfully signed in to your account.',
      });
  
      // Redirect to user's profile page using their username
      router.push(`/${userData.username}`);
  
    } catch (error) {
      // Handle network/connection errors
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error('Connection error', {
          description: 'Please check your internet connection and try again.',
          duration: 5000,
        });
      } else {
        toast.error('Something went wrong', {
          description: 'An unexpected error occurred. Please try again later.',
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen grid md:grid-cols-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="flex items-center justify-center px-4 md:px-8 py-8 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Welcome back!</h1>
            <p className="text-lg text-gray-500">Sign in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
      </motion.div>
      <motion.div 
        className="hidden md:block bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

export default LoginForm;