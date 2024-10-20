"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const UserSidebar = () => {

  const pathname = usePathname(); // usePathname() hook replaces useRouter() to get the current path in client components

  return (
    <div className="w-[15vw] h-[82vh] bg-white shadow-lg rounded-lg p-4">
      <nav className="space-y-4 m-1">
        {/* Orders */}
        <Link href="/user/orders">
          <div
            className={`m-2 p-3 rounded-lg cursor-pointer transition-colors text-xl font-medium 
              ${
                pathname === '/user/orders'
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700'
              }`}
          >
            Orders
          </div>
        </Link>

        {/* Profile */}
        <Link href="/user/profile">
          <div
            className={`p-3 m-2 rounded-lg cursor-pointer transition-colors text-xl font-medium 
              ${
                pathname === '/user/profile'
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700'
              }`}
          >
            Profile
          </div>
        </Link>

        {/* Update Profile */}
        <Link href="/user/edit_profile">
          <div
            className={`p-3 m-2 rounded-lg cursor-pointer transition-colors text-xl font-medium 
              ${
                pathname === '/user/edit_profile'
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700'
              }`}
          >
            Update Profile
          </div>
        </Link>

        {/* Logout */}
        {/* <Link href="/user"> */}
          <div onClick={() => { signOut() }}
            className="p-3 m-2 rounded-lg cursor-pointer text-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Log Out
          </div>
        {/* </Link> */}
      </nav>
    </div>
  );
};

export default UserSidebar;
