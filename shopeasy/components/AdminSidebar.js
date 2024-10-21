"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const AdminSidebar = () => {

    const pathname = usePathname(); // usePathname() hook replaces useRouter() to get the current path in client components

    return (
        <div className="w-[15vw] h-[82vh] bg-white shadow-lg rounded-lg p-4">
            <nav className="space-y-4 m-1">

                <Link href="/admin_dashboard/orders">
                    <div className={`m-1 p-2 rounded-lg cursor-pointer transition-colors text-xl font-medium 
                            ${pathname === '/admin_dashboard/orders'
                            ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700'
                        }`} >
                        Recieved Orders
                    </div>
                </Link>
                <Link href="/admin_dashboard/admin">
                    <div className={`m-1 p-2 rounded-lg cursor-pointer transition-colors text-xl font-medium 
                            ${pathname === '/admin_dashboard/admin'
                            ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700'
                        }`} >
                        Sell Products  
                    </div>
                </Link>


                <div onClick={() => { signOut() }}
                    className="p-3 m-2 rounded-lg cursor-pointer text-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                    Log Out
                </div>
            </nav>
        </div>
    );
};

export default AdminSidebar;
