"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const UserProfile = () => {
  const { data: session } = useSession()
  const user = session?.user;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      {/* Profile Section */}
      <div className="flex items-center space-x-6 bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg shadow-md">
        <img
          src={user?.profilepic || '/user.svg'}
          alt={`Not available`}
          className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
        />
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">{user?.name || 'User Name'}</h2>
          <span className="text-gray-200">@{user?.username || 'username'}</span>
          {user?.isAdmin && (
            <span className="bg-red-600 text-white px-3 py-1 text-sm rounded-lg mt-2 shadow-md">
              Admin
            </span>
          )}
        </div>
      </div>

      {/* User Info Section */}
      <div className="grid grid-cols-2 gap-6 mt-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h3 className="text-gray-600 font-semibold">Email</h3>
          <p className="text-gray-800">{user?.email || 'email@example.com'}</p>
        </div>
        <div>
          <h3 className="text-gray-600 font-semibold">Phone</h3>
          <p className="text-gray-800">{user?.phone || '+91-00000-00000'}</p>
        </div>
        <div>
          <h3 className="text-gray-600 font-semibold">Address</h3>
          <p className="text-gray-800">{user?.address || '123, Street, City, Country'}</p>
        </div>
        <div>
          <h3 className="text-gray-600 font-semibold">Date of Birth</h3>
          <p className="text-gray-800">{user?.dateOfBirth || 'YYYY-MM-DD'}</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-8 text-right">
        <Link href={"/user/edit_profile"}>
        <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg shadow hover:from-green-600 hover:to-teal-600 transition duration-300">
          Edit Profile
        </button>
        </Link>
      </div>
    </div>
  )
}

export default UserProfile
