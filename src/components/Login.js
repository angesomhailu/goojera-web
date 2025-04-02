import React, { useState } from "react";
import Logo from "@/components/Logo";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import Head from 'next/head';

const Login = () => {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await signIn("google", { 
        callbackUrl: '/',
        redirect: false 
      });
      
      if (result?.error) {
        setError('Failed to sign in with Google. Please try again.');
      } else if (result?.ok) {
        router.push('/');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_bg_gradient bg-cover h-screen grid place-items-center">
      <Head>
        <title>{isNewUser ? 'Sign Up' : 'Sign In'} - Goojera</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logo style="w-52 absolute top-0 left-0 m-8" />

      <div className="bg-[rgba(0,0,0,0.75)] p-10 w-96 space-y-6 rounded-md">
        <h2 className="text-3xl font-medium text-center text-white">
          {isNewUser ? 'Create Account' : 'Sign In'}
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md text-sm">
            {error}
          </div>
        )}

        {isNewUser ? (
          // Sign Up Form
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 text-lg bg-[#333] text-white rounded-md outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 text-lg bg-[#333] text-white rounded-md outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 text-lg bg-[#333] text-white rounded-md outline-none"
            />
            <button
              className="w-full bg-red-600 text-white p-4 text-lg rounded-md hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="text-center text-gray-400">
              - OR -
            </div>
          </div>
        ) : null}

        <button
          className="bg-white text-black flex gap-2 items-center p-4 text-xl rounded-md cursor-pointer w-full justify-center hover:bg-gray-200 transition disabled:opacity-50"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <FcGoogle className="text-3xl" />
          {loading ? 'Processing...' : `Sign ${isNewUser ? 'up' : 'in'} with Google`}
        </button>

        <div className="text-gray-400 text-center">
          {isNewUser ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setIsNewUser(false)}
                className="text-white hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              New to Goojera?{' '}
              <button
                onClick={() => setIsNewUser(true)}
                className="text-white hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <div className="text-gray-400 text-sm text-center">
          By signing {isNewUser ? 'up' : 'in'}, you agree to our{' '}
          <button className="text-white hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-white hover:underline">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
};

export default Login;