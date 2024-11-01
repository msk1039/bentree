"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  CheckCircle, 
  ArrowRight, 
  XCircle, 
  LogIn, 
  Check 
} from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AvailableUsernameProps {
  username: string;
}

export function AvailableUsername({ username }: AvailableUsernameProps) {
  const isValidUsername = username.length >= 3 && username.length <= 30;

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center px-4 md:px-8 py-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="relative mx-auto w-24 h-24">
              {isValidUsername ? (
                <>
                  <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                  <div className="relative flex items-center justify-center h-full">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
                  <div className="relative flex items-center justify-center h-full">
                    <XCircle className="h-12 w-12 text-red-500" />
                  </div>
                </>
              )}
            </div>
            <h1 className="text-4xl font-bold text-black mt-6 mb-3">
              @{username}
            </h1>
            {isValidUsername ? (
              <div className="bg-green-50 rounded-full px-4 py-2 inline-block">
                <p className="text-green-600 font-medium">Available for registration</p>
              </div>
            ) : (
              <Alert variant="destructive" className="mt-4 bg-red-50 border-red-100">
                <AlertDescription>
                  Username must be between 3 and 30 characters
                </AlertDescription>
              </Alert>
            )}
          </div>

          {isValidUsername && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">✨</span>
                  Why claim this username?
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-600 group">
                    <div className="mr-3 bg-white p-2 rounded-lg group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <span className="group-hover:text-black transition-colors duration-300">Secure your unique identity</span>
                  </li>
                  <li className="flex items-center text-gray-600 group">
                    <div className="mr-3 bg-white p-2 rounded-lg group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <span className="group-hover:text-black transition-colors duration-300">Create your personal profile</span>
                  </li>
                  <li className="flex items-center text-gray-600 group">
                    <div className="mr-3 bg-white p-2 rounded-lg group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <span className="group-hover:text-black transition-colors duration-300">Create your place on the Internet</span>

                  </li>
                </ul>
              </div>

              <Link href={`/user/signup?username=${username}`}>
                <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-xl p-6 h-auto group transform hover:scale-102 transition-all duration-200">
                  <div>
                    <div className="flex items-center justify-center">
                      <UserPlus className="mr-2 group-hover:rotate-12 transition-transform duration-200" size={20} />
                      <span className="text-lg">Create Account</span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">to claim @{username}</p>
                  </div>
                </Button>
              </Link>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <Link href="/user/login">
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl p-6 h-auto group hover:bg-gray-50 transition-colors duration-200 mt-4"
                >
                  <div className="flex items-center justify-center">
                    <LogIn className="mr-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
                    <span className="text-lg">Sign in to your account</span>
                  </div>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="h-full flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-black mb-4">Join our community</h2>
              <p className="text-gray-600 leading-relaxed">
                Be part of something bigger. Your journey starts with claiming your unique username.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                    Free
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                    Secure
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                    Simple
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}