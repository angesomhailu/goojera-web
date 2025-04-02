import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState } from 'react';

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('watchlist');

  // Redirect if not logged in
  if (!session) {
    router.push('/Login');
    return null;
  }

  const tabs = {
    watchlist: {
      title: "My Watchlist",
      content: [] // Your watchlist data here
    },
    history: {
      title: "Watch History",
      content: [] // Your watch history data here
    },
    ratings: {
      title: "My Ratings",
      content: [] // Your ratings data here
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Head>
        <title>Profile - Goojera</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="relative px-4 pb-24 lg:space-y-24 lg:px-16 pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={session.user.image || "/images/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {session.user.name || 'User Profile'}
              </h1>
              <p className="text-gray-400">{session.user.email}</p>
              <button className="mt-2 text-sm text-blue-500 hover:underline">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-[#141414] rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400">Watchlist</p>
            </div>
            <div className="bg-[#141414] rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400">Watched</p>
            </div>
            <div className="bg-[#141414] rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400">Reviews</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-600">
            <nav className="flex space-x-8">
              {Object.keys(tabs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 relative ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tabs[tab].title}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {tabs[activeTab].content.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tabs[activeTab].content.map((item) => (
                  <div key={item.id} className="relative h-48 cursor-pointer">
                    {/* Content items */}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  {activeTab === 'watchlist'
                    ? "Your watchlist is empty. Add some titles to watch later!"
                    : activeTab === 'history'
                    ? "You haven't watched any titles yet."
                    : "You haven't rated any titles yet."}
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                >
                  Browse Titles
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile; 