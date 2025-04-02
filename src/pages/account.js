import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Account = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('membership');

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Head>
        <title>Account Settings - Goojera</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="relative px-4 pb-24 lg:space-y-24 lg:px-16 pt-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Account Settings</h1>

          {/* Membership & Billing */}
          <div className="bg-[#141414] rounded-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Membership & Billing
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-600">
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="text-white">{session.user.email}</p>
                </div>
                <button className="text-blue-500 hover:underline">
                  Change email
                </button>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-600">
                <div>
                  <p className="text-gray-400">Password</p>
                  <p className="text-white">********</p>
                </div>
                <button className="text-blue-500 hover:underline">
                  Change password
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400">Subscription Plan</p>
                  <p className="text-white">Premium Plan</p>
                </div>
                <button className="text-blue-500 hover:underline">
                  Change plan
                </button>
              </div>
            </div>
          </div>

          {/* Profile & Parental Controls */}
          <div className="bg-[#141414] rounded-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Profile & Parental Controls
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 pb-4 border-b border-gray-600">
                <Image
                  src={session.user.image || "/images/default-avatar.png"}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-md"
                />
                <div>
                  <p className="text-white">{session.user.name}</p>
                  <p className="text-gray-400">All Maturity Ratings</p>
                </div>
                <button className="ml-auto text-blue-500 hover:underline">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-[#141414] rounded-md p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-600">
                <p className="text-white">Autoplay next episode</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-white">Autoplay previews</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account; 