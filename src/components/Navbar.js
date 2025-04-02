import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Image from "next/image";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { BsBellFill } from 'react-icons/bs';
import { FaCircle, FaTrash } from 'react-icons/fa';

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample notifications - in a real app, this would come from your backend
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Movie Added",
      message: "Watch 'The Latest Blockbuster' now!",
      time: "2 hours ago",
      isNew: true,
    },
    {
      id: 2,
      title: "Continue Watching",
      message: "Continue where you left off in 'Popular Series'",
      time: "1 day ago",
      isNew: true,
    },
    {
      id: 3,
      title: "Subscription Update",
      message: "Your premium subscription will renew soon",
      time: "3 days ago",
      isNew: false,
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${e.target.value}`
        );
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error("Error searching:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleNavigation = (path) => {
    setShowMenu(false);
    router.push(path);
  };

  const handleSignOut = async () => {
    try {
      setShowMenu(false);
      await signOut({ redirect: false });
      localStorage.removeItem('next-auth.session-token');
      sessionStorage.clear();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowMenu(false); // Close profile menu if open
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({
      ...notif,
      isNew: false
    })));
  };

  return (
    <nav className={`${isScrolled && "bg-[#141414]"} fixed top-0 z-50 w-full transition-all duration-500 ease-in-out`}>
      <div className="container flex justify-between">
        <div className="flex items-center space-x-2 md:space-x-10">
          <Link href="/">
            <Logo style="h-auto w-[100px]" />
          </Link>

          <ul className="hidden space-x-4 md:flex">
            <li className="headerLink cursor-pointer font-semibold text-white hover:text-white">
              <Link href="/">Home</Link>
            </li>

            <li className="headerLink">
              <Link href="/tv-shows">TV Shows</Link>
            </li>
            <li className="headerLink">
              <Link href="/movies">Movies</Link>
            </li>
            <li className="headerLink">
              <Link href="/new-popular">New & Popular</Link>
            </li>
            <li className="headerLink">
              <Link href="/my-list">My List</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4 text-sm font-light">
          <div className="relative">
            {!showSearch ? (
              <BiSearch
                className="sm h-6 w-6 cursor-pointer"
                onClick={() => setShowSearch(true)}
              />
            ) : (
              <div className="flex items-center bg-[#141414] rounded-full px-3 py-1">
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  className="bg-transparent text-white focus:outline-none w-[200px]"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <BiSearch className="h-6 w-6 text-gray-400" />
              </div>
            )}
            
            {/* Search Results Dropdown */}
            {Array.isArray(searchResults) && searchResults.length > 0 && showSearch && (
              <div className="absolute top-10 right-0 bg-[#141414] border border-gray-700 rounded-md w-[300px] max-h-[400px] overflow-y-auto z-50">
                {searchResults.map((result) => (
                  result && (
                    <Link
                      key={result.id}
                      href={`/${result.media_type}/${result.id}`}
                      className="flex items-center p-3 hover:bg-gray-800 cursor-pointer"
                      onClick={() => {
                        setShowSearch(false);
                        setSearchResults([]);
                        setSearchTerm("");
                      }}
                    >
                      {result.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                          alt={result.title || result.name}
                          className="w-12 h-16 object-cover rounded-sm"
                        />
                      ) : (
                        <div className="w-12 h-16 bg-gray-600 rounded-sm" />
                      )}
                      <div className="ml-3">
                        <p className="text-white text-sm">
                          {result.title || result.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {result.media_type?.charAt(0).toUpperCase() +
                            result.media_type?.slice(1)}
                          {" • "}
                          {result.release_date || result.first_air_date
                            ? new Date(
                                result.release_date || result.first_air_date
                              ).getFullYear()
                            : "N/A"}
                        </p>
                      </div>
                    </Link>
                  )
                ))}
              </div>
            )}
          </div>
          
          {/* Notifications Bell */}
          <div className="relative">
            <div className="relative cursor-pointer" onClick={handleNotificationClick}>
              <BsBellFill className="h-6 w-6" />
              {notifications.some(n => n.isNew) && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full" />
              )}
            </div>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-black border border-gray-700 rounded-md shadow-lg py-2 max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
                  <h3 className="text-white font-semibold">Notifications</h3>
                  {notifications.some(n => n.isNew) && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-500 hover:text-blue-400"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-700">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-800 transition-colors relative group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2">
                            {notification.isNew && (
                              <FaCircle className="text-red-600 w-2 h-2 mt-2" />
                            )}
                            <div>
                              <p className="text-white font-medium">
                                {notification.title}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {notification.message}
                              </p>
                              <p className="text-gray-500 text-xs mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearNotification(notification.id);
                            }}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-gray-400">
                    No notifications
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              <img
                src={session?.user?.image || "/images/default-avatar.png"}
                alt="Profile"
                className="rounded-full h-8 w-8"
              />
            </div>
            
            {showMenu && (
              <div className="absolute right-0 top-10 bg-black border border-gray-700 rounded-md shadow-lg py-2 w-48">
                {status === "authenticated" && session ? (
                  <>
                    <div className="px-4 py-2 text-gray-300">
                      {session.user?.name || 'User'}
                    </div>
                    <hr className="border-gray-700" />
                    <button
                      onClick={() => handleNavigation('/profile')}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleNavigation('/settings')}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Setting
                    </button>
                    <button
                      onClick={() => handleNavigation('/account')}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Account
                    </button>
                    <button
                      onClick={() => handleNavigation('/help')}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Help Center
                    </button>
                    <hr className="border-gray-700" />
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavigation('/login')}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleNavigation('/signup')}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside handler */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;