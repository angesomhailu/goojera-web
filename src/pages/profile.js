import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FaHistory, FaHeart, FaBookmark, FaStar } from 'react-icons/fa';
import Image from 'next/image';

// Create a client-side only component
const ProfileContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('watchlist');

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const tabs = {
    watchlist: {
      icon: <FaBookmark className="w-5 h-5" />,
      title: "My Watchlist",
      content: [] // Your watchlist data here
    },
    history: {
      icon: <FaHistory className="w-5 h-5" />,
      title: "Watch History",
      content: [] // Your watch history data here
    },
    favorites: {
      icon: <FaHeart className="w-5 h-5" />,
      title: "Favorites",
      content: [] // Your favorites data here
    },
    ratings: {
      icon: <FaStar className="w-5 h-5" />,
      title: "My Ratings",
      content: [] // Your ratings data here
    }
  };

  const stats = [
    { label: 'Watchlist', value: '0' },
    { label: 'Watched', value: '0' },
    { label: 'Favorites', value: '0' },
    { label: 'Reviews', value: '0' }
  ];

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
          <div className="bg-[#141414] rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative group">
                <Image
                  src={session.user.image || "/images/default-avatar.png"}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-sm">Change Photo</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">
                  {session.user.name}
                </h1>
                <p className="text-gray-400">{session.user.email}</p>
                <p className="text-gray-400 mt-2">Member since {new Date().getFullYear()}</p>
                <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#141414] rounded-md p-4 text-center transform hover:scale-105 transition-transform">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs Navigation */}
          <div className="bg-[#141414] rounded-t-md border-b border-gray-600">
            <div className="flex overflow-x-auto">
              {Object.entries(tabs).map(([key, tab]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center space-x-2 px-6 py-4 transition-colors ${
                    activeTab === key
                      ? 'text-white border-b-2 border-red-600'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-[#141414] rounded-b-md p-6">
            {tabs[activeTab].content.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tabs[activeTab].content.map((item, index) => (
                  <div key={index} className="relative aspect-video bg-gray-800 rounded-md overflow-hidden">
                    {/* Content items will go here */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500">No content yet</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">
                  {activeTab === 'watchlist'
                    ? "Your watchlist is empty. Add some titles to watch later!"
                    : activeTab === 'history'
                    ? "You haven't watched any titles yet."
                    : activeTab === 'favorites'
                    ? "You haven't added any favorites yet."
                    : "You haven't rated any titles yet."}
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
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

// Main page component with dynamic import
const Profile = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return <ProfileContent />;
};

// Force server-side rendering
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default Profile; 