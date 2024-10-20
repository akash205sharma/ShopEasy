"use client"

import React, { useState } from 'react';
import { updateUser } from '@/actions/users';     
import { toast } from 'sonner';
import { useSession} from 'next-auth/react'

const Edit_Profile = () => {
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState({
    email: session?.user?.email,
    name: session?.user?.name,
    address: session?.user?.address,
    phone: session?.user?.phone,
    dateOfBirth: session?.user?.dateOfBirth,
    isAdmin : session?.user?.isAdmin, 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      toast("Your Profile is Updated", {
        description: formData.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-lg text-center mb-6">Update Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="flex items-center space-x-4">
          <label className="w-[150px] text-lg text-gray-700 font-medium">Name</label>
          <input
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Address Field */}
        <div className="flex items-center space-x-4">
          <label className="w-[150px] text-lg text-gray-700 font-medium">Address</label>
          <input
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your Address"
          />
        </div>

        {/* Phone Field */}
        <div className="flex items-center space-x-4">
          <label className="w-[150px] text-lg text-gray-700 font-medium">Phone</label>
          <input
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your Phone Number"
          />
        </div>

        {/* Date of Birth Field */}
        <div className="flex items-center space-x-4">
          <label className="w-[150px] text-lg text-gray-700 font-medium">Date of Birth</label>
          <input
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        {/* Is Admin Checkbox */}
        <div className="flex items-center space-x-4">
          <input
            className="w-5 h-5 border-gray-300 rounded focus:ring-teal-500"
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />
          <label className="text-lg text-gray-700 font-medium">Are you a Product Owner?</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-lg hover:from-green-600 hover:to-teal-600 focus:ring-2 focus:ring-teal-500 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Edit_Profile;
