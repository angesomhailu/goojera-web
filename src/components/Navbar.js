import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Image from "next/image";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { IoSettingsOutline } from "react-icons/io5";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  return (
    <nav className={`${isScrolled && "bg-[#141414]"}`}>
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
          
          <div className="relative">
            <CgProfile 
              className="h-6 w-6 cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            
            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 top-8 w-48 bg-[#141414] border border-gray-700 rounded-md shadow-lg z-50">
                <div className="py-1">
                  {/* Profile Section */}
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm text-white">Signed in as</p>
                    <p className="text-sm font-medium text-gray-300 truncate">
                      user@example.com
                    </p>
                  </div>

                  {/* Menu Items */}
                  <Link 
                    href="/profile"
                    className=" px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <CgProfile className="mr-2 h-5 w-5" />
                    Profile
                  </Link>

                  <Link 
                    href="/settings"
                    className=" px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <IoSettingsOutline className="mr-2 h-5 w-5" />
                    Settings
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-gray-700 my-1"></div>

                  {/* Sign Out Button */}
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      signOut();
                    }}
                    className=" w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center"
                  >
                    <AiOutlineLogout className="mr-2 h-5 w-5" />
                    Sign Out
                  </button>
                </div>
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