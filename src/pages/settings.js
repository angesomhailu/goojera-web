import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { MdSecurity, MdLanguage } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";

const Settings = () => {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState("notifications");

  // Placeholder settings data - replace with actual user settings from your backend
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      newArrivals: true,
      recommendations: true,
      watchlistUpdates: false,
    },
    playback: {
      autoplayNext: true,
      autoplayPreviews: true,
      defaultQuality: "Auto",
      defaultAudio: "Original",
    },
    language: {
      interface: "English",
      subtitles: "English",
      audio: "English",
    },
    security: {
      twoFactorAuth: false,
      requirePasswordForPurchases: true,
      saveLoginInfo: true,
    },
  });

  const handleSettingChange = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting],
      },
    }));
  };

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Navbar />
      <main className="relative px-4 pb-24 lg:space-y-24 lg:px-16">
        <div className="md:space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white pt-24">Settings</h1>

          <div className="mt-8 bg-[#141414] rounded-md p-6 max-w-4xl">
            {/* Settings Navigation */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
              <div className="sm:w-1/4">
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveSection("notifications")}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                      activeSection === "notifications"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <IoNotifications className="h-5 w-5" />
                    <span>Notifications</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("playback")}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                      activeSection === "playback"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <FaPlayCircle className="h-5 w-5" />
                    <span>Playback</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("language")}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                      activeSection === "language"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <MdLanguage className="h-5 w-5" />
                    <span>Language</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("security")}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                      activeSection === "security"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <MdSecurity className="h-5 w-5" />
                    <span>Security</span>
                  </button>
                </div>
              </div>

              {/* Settings Content */}
              <div className="sm:w-3/4 bg-gray-900 rounded-md p-6">
                {/* Notifications Settings */}
                {activeSection === "notifications" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium text-white">Notification Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive email updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.notifications.emailNotifications}
                            onChange={() => handleSettingChange("notifications", "emailNotifications")}
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      {/* Add more notification settings */}
                    </div>
                  </div>
                )}

                {/* Playback Settings */}
                {activeSection === "playback" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium text-white">Playback Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300">Autoplay Next Episode</p>
                          <p className="text-sm text-gray-500">Play next episode automatically</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.playback.autoplayNext}
                            onChange={() => handleSettingChange("playback", "autoplayNext")}
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      {/* Add more playback settings */}
                    </div>
                  </div>
                )}

                {/* Language Settings */}
                {activeSection === "language" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium text-white">Language Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300">Interface Language</label>
                        <select
                          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white py-2 px-3"
                          value={settings.language.interface}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            language: { ...prev.language, interface: e.target.value }
                          }))}
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                      {/* Add more language settings */}
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeSection === "security" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium text-white">Security Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.security.twoFactorAuth}
                            onChange={() => handleSettingChange("security", "twoFactorAuth")}
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      {/* Add more security settings */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings; 