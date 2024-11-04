"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import Productcard from './Productcard';
import { fetchFilteredproducts } from '@/actions/product';


const Showroom = () => {
  const [minprice, setMinprice] = useState(0);
  const [maxprice, setMaxprice] = useState(20000);
  const [products, setProducts] = useState([]);

  const handelminrange = (e) => {
    setMinprice(e.target.value);
  };
  const handelmaxrange = (e) => {
    setMaxprice(e.target.value);
  };

  useEffect(() => {

    const fetchProducts = async () => {

      const filteredProducts = await fetchFilteredproducts(minprice, maxprice) // Fetch products with the new state values
      setProducts(filteredProducts); // Update the state with the fetched products
      // console.log("Data changed");
      // console.log(filteredProducts);

    };

    fetchProducts();
  }, [minprice, maxprice]);



  // useEffect(() => {
  //   if(products.length==0) return
  //   const filteredProducts = products.filter({minprice:products.minprice})

  //   setProducts(filteredProducts);

  // }, [minprice,maxprice])

  return (
      <div className="flex flex-col lg:flex-row w-full">
        {/* Sidebar */}
        <div className="lg:sticky top-0 lg:h-screen lg:overflow-y-auto lg:w-1/4 w-full p-4 mb-4 lg:mb-0">
          <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-2xl font-bold text-[#253D4E] mb-4">Category</h2>
            <div className="space-y-4">
              {["Milk and Dairies", "Pet Foods", "Clothing", "Baking material", "Fresh Fruits"].map((category, index) => (
                  <div key={index} className="flex items-center p-2 border rounded-lg">
                    <img width={30} src={`category-${index + 1}.svg`} alt={category} />
                    <span className="ml-4">{category}</span>
                  </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="text-2xl font-bold text-[#253D4E] mb-4">Filter By Price</h2>
            <div>
              <label>Min Price: {minprice}</label>
              <input
                  onChange={handelminrange}
                  value={minprice}
                  type="range"
                  min={0}
                  max={75}
                  className="w-full mb-2"
              />
              <label>Max Price: {maxprice}</label>
              <input
                  onChange={handelmaxrange}
                  value={maxprice}
                  type="range"
                  min={100}
                  max={20000}
                  className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full lg:w-3/4 px-4 overflow-y-auto no-scrollbar">
          {products.map((item) => (
              <Productcard key={item._id} item={item} />
          ))}
        </div>
      </div>
  );
};

export default Showroom;