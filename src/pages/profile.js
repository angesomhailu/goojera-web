import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");

  // Placeholder user data - replace with actual user data from your backend
  const userData = {
    name: session?.user?.name || "User Name",
    email: session?.user?.email || "user@example.com",
    plan: "Premium",
    joinDate: "January 2024",
    preferences: {
      language: "English",
      maturityRating: "Adult",
      autoplayNext: true,
      autoplayPreviews: true,
    }
  };

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Navbar />
      <main className="relative px-4 pb-24 lg:space-y-24 lg:px-16">
        <div className="md:space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white pt-24">Profile</h1>

          {/* Profile Content */}
          <div className="mt-8 bg-[#141414] rounded-md p-6 max-w-4xl">
            {/* Profile Header */}
            <div className="flex items-center space-x-6 pb-6 border-b border-gray-700">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    layout="fill"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                    <span className="text-4xl text-white">
                      {userData.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                <p className="text-gray-400">{userData.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {userData.joinDate}
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-4 mt-6 border-b border-gray-700">
              <button
                className={`pb-4 px-2 text-sm font-medium ${
                  activeTab === "profile"
                    ? "text-white border-b-2 border-red-600"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile & Settings
              </button>
              <button
                className={`pb-4 px-2 text-sm font-medium ${
                  activeTab === "billing"
                    ? "text-white border-b-2 border-red-600"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("billing")}
              >
                Billing Details
              </button>
            </div>

            {/* Profile Content */}
            {activeTab === "profile" && (
              <div className="mt-6 space-y-6">
                {/* Membership & Billing */}
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-white">
                    Membership & Billing
                  </h3>
                  <div className="bg-gray-800 p-4 rounded-md">
                    <p className="text-gray-300">
                      Current Plan: <span className="text-white font-medium">{userData.plan}</span>
                    </p>
                  </div>
                </div>

                {/* Profile Settings */}
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-white">
                    Profile Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">Language</p>
                        <p className="text-sm text-gray-500">
                          {userData.preferences.language}
                        </p>
                      </div>
                      <button className="text-blue-400 hover:underline">
                        Change
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">Maturity Rating</p>
                        <p className="text-sm text-gray-500">
                          {userData.preferences.maturityRating}
                        </p>
                      </div>
                      <button className="text-blue-400 hover:underline">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Playback Settings */}
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-white">
                    Playback Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300">Autoplay next episode</p>
                        <p className="text-sm text-gray-500">
                          Play the next episode automatically
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={userData.preferences.autoplayNext}
                          onChange={() => {}}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300">Autoplay previews</p>
                        <p className="text-sm text-gray-500">
                          Play previews while browsing
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={userData.preferences.autoplayPreviews}
                          onChange={() => {}}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Content */}
            {activeTab === "billing" && (
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-white">
                    Billing Information
                  </h3>
                  <div className="bg-gray-800 p-4 rounded-md">
                    <p className="text-gray-300">
                      Your next billing date is <span className="text-white font-medium">February 1, 2024</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile; 