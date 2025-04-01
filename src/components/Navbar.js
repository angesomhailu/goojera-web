import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import Image from "next/image";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <nav>
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
          <BiSearch className="sm hidden h-6 w-6 sm:inline" />
          <p className="hidden lg:inline">Kids</p>
          <BsBellFill className="h-6 w-6" />
           <AiOutlineLogout className="cursor-pointer rounded w-auto h-auto"
           onClick={() => signOut()}/>
            
        </div>
      </div>
    </nav>
  );
};

export default Navbar;