"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserIcon, MailIcon, LockIcon, Loader2Icon, ArrowRightIcon, CheckIcon, XIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import debounce from 'lodash/debounce';

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;

const SignUpFlow = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState({ 
    isChecking: false,
    isAvailable: false,
    error: '' 
  });
  const [generalError, setGeneralError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle URL parameters on component mount
  useEffect(() => {
    const urlUsername = searchParams.get('username');
    if (urlUsername) {
      setUsername(urlUsername.toLowerCase());
    }
  }, [searchParams]);

  const checkUsername = useCallback(debounce(async (username) => {
    if (!username || !USERNAME_REGEX.test(username)) {
      setUsernameStatus({ 
        isChecking: false, 
        isAvailable: false, 
        error: username.length < 3 ? '' : 'Username must be 3-20 characters long and can only contain letters, numbers, underscores, and hyphens' 
      });
      return;
    }

    setUsernameStatus(prev => ({ ...prev, isChecking: true }));

    try {
      const response = await fetch(`/api/auth/check-username?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      setUsernameStatus({
        isChecking: false,
        isAvailable: data.available,
        error: data.available ? '' : 'Username is already taken'
      });

      // Automatically proceed to next step if username from URL is valid
      if (data.available && searchParams.get('username')) {
        setTimeout(() => {
          setStep(2);
        }, 800); 
      }
    } catch (error) {
      setUsernameStatus({
        isChecking: false,
        isAvailable: false,
        error: 'Error checking username availability'
      });
      console.log('Error checking username:', error);
    }
  }, 300), [searchParams]);

  useEffect(() => {
    if (username) {
      checkUsername(username);
    } else {
      setUsernameStatus({ isChecking: false, isAvailable: false, error: '' });
    }
  }, [username, checkUsername]);

  const handleUsernameSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (usernameStatus.isAvailable && !usernameStatus.error) {
      setStep(2);
    }
  };

  const handleFinalSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    setLoading(true);
    setGeneralError('');
  
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username,
          email: formData.get('email'),
          password: formData.get('password'),
          full_name: formData.get('full_name')
        }),
      });
    
      const result = await response.json();
    
      if (!response.ok) {
        throw new Error(result.error || 'An error occurred during signup');
      }
    
      const email = formData.get('email');
      if (typeof email === 'string') {
        router.push(`/user/signup/SignUpConfirmation?email=${encodeURIComponent(email)}`);
      } else {
        setGeneralError('Invalid email address.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setGeneralError((error as Error).message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center px-4 md:px-8 py-8 bg-white">
        <div className="w-full max-w-md">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-black mb-2">First, claim your unique link</h1>
                <p className="text-lg text-gray-500">The good ones are still available!</p>
              </div>

              <form onSubmit={handleUsernameSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center bg-gray-100 rounded-lg p-3 w-full">
                      <span className="text-gray-500">edbn.me/</span>
                      <input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase())}
                        placeholder="your-name"
                        className="bg-transparent outline-none text-gray-500 flex-grow"
                        required
                        minLength={3}
                        maxLength={20}
                        spellCheck={false}
                      />
                      {username && (
                        <div className="flex items-center pl-2">
                          {usernameStatus.isChecking ? (
                            <Loader2Icon className="h-4 w-4 animate-spin text-gray-400" />
                          ) : usernameStatus.isAvailable ? (
                            <CheckIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <XIcon className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {usernameStatus.error && (
                      <p className="text-sm text-red-500 mt-2">
                        {usernameStatus.error}
                      </p>
                    )}
                    {usernameStatus.isAvailable && (
                      <p className="text-sm text-green-500 mt-2">
                        Username is available!
                      </p>
                    )}
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!usernameStatus.isAvailable || loading}
                >
                  Continue
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          ) : (
            <Card className="border-none shadow-none">
              <CardHeader className="space-y-1 px-0">
                <CardTitle className="text-2xl font-bold">Complete your profile</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                {generalError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{generalError}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-base">
                        Full name
                      </Label>
                      <div className="flex items-center bg-gray-100 rounded-lg p-3 w-full">
                        <UserIcon className="text-gray-400" size={18} />
                        <input
                          id="full_name"
                          name="full_name"
                          placeholder="John Doe"
                          className="bg-transparent outline-none text-gray-500 flex-grow ml-2"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">
                        Email
                      </Label>
                      <div className="flex items-center bg-gray-100 rounded-lg p-3 w-full">
                        <MailIcon className="text-gray-400" size={18} />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          className="bg-transparent outline-none text-gray-500 flex-grow ml-2"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-base">
                        Password
                      </Label>
                      <div className="flex items-center bg-gray-100 rounded-lg p-3 w-full">
                        <LockIcon className="text-gray-400" size={18} />
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-transparent outline-none text-gray-500 flex-grow ml-2"
                          required
                          minLength={8}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2Icon className="animate-spin mr-2" />
                        Creating account...
                      </>
                    ) : (
                      'Create account'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Button 
              variant="link" 
              className="text-gray-900 font-semibold p-0"
              onClick={() => router.push('/user/login')}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden md:block bg-gray-50" />
    </div>
  );
}

export default SignUpFlow;