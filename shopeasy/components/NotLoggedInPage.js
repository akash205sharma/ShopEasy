import React from 'react';
import Link from 'next/link';

const NotLoggedInPage = () => {
    return (
        <div className="w-[40vw] m-auto mt-10 text-center bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-red-600 mb-4">Access Denied</h2>
            <p className="text-lg text-gray-700 mb-4">You need to be logged in to view your account orders or update your profile.</p>
            <p className="text-lg text-gray-700 mb-6">Please log in to access these features.</p>
            <Link href="/login">
                <button className="py-2 px-4 text-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 transition-colors shadow-lg">
                    Log In
                </button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">Don`&lsquo;`t have an account? <Link href="/register" className="text-green-600 hover:underline">Register here</Link>.</p>
        </div>
    );
};

export default NotLoggedInPage;
