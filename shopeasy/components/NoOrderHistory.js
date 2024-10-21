"use client";

import React from "react";
import Link from "next/link";

const NoOrderHistory = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[71vh] p-10 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        No Orders Found
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        You have not placed any orders yet. Explore our products and start
        shopping!
      </p>
      <Link href="/">
        <div className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
          Shop Now
        </div>
      </Link>
    </div>
  );
};

export default NoOrderHistory;
