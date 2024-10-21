"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import Productcard from './Productcard'
// import { use } from 'react';
import { fetchFilteredproducts } from '@/actions/product';


const Showroom = () => {
  const [minprice, setMinprice] = useState(0);
  const [maxprice, setMaxprice] = useState(100);  //no max price
  const [products, setProducts] = useState([])

  const handelminrange = (e) => {
    setMinprice(e.target.value);
  }
  const handelmaxrange = (e) => {
    setMaxprice(e.target.value);
  }


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
    <div className='h-[calc(100vh-120px)] w-[98vw] flex '>


      {/* sidebar */}

      <div className='sticky top-[12px] h-[full] w-[350px] m-4 mr-0 '>
        <div className='border w-[full] h-[400px] mb-2 rounded-lg '>
          <div className=' text-left ml-10 p-2 text-2xl font-bold text-[#253D4E] '>Category</div>
          <div>
            <div className='rounded-xl flex justify-start ml-10 mr-10 mt-4 p-2 border'> <img width={30} src="category-1.svg" alt="" /> &nbsp;&nbsp; Milk and Dairies</div>
            <div className='rounded-xl flex justify-start ml-10 mr-10 mt-4 p-2 border'> <img width={30} src="category-2.svg" alt="" /> &nbsp;&nbsp; Pet Foods</div>
            <div className='rounded-xl flex justify-start ml-10 mr-10 mt-4 p-2 border'> <img width={30} src="category-3.svg" alt="" /> &nbsp;&nbsp;Clothing</div>
            <div className='rounded-xl flex justify-start ml-10 mr-10 mt-4 p-2 border'> <img width={30} src="category-4.svg" alt="" />&nbsp;&nbsp; Baking material</div>
            <div className='rounded-xl flex justify-start ml-10 mr-10 mt-4 p-2 border'> <img width={30} src="category-5.svg" alt="" /> &nbsp;&nbsp;Fresh Fruits</div>
          </div>
        </div>


        <div className='border w-[full] h-[192px] mb-2 rounded-lg '>
          <h2 className=' text-left ml-10 p-2 text-2xl font-bold text-[#253D4E] '>Filter By Price</h2>
          <div className='mx-[20px] '>
            <input onChange={(e) => { handelminrange(e) }} name='minprice' value={minprice} id='minprice' type="range" min={0} max={75} className='w-[200px] ' />
            <div>Min Price {minprice}</div>
            <input onChange={(e) => { handelmaxrange(e) }} value={maxprice} id='maxprice' type="range" min={100} max={20000} className='w-[200px]' />
            <div>Max Price {maxprice}</div>
            {/* <div onClick={(e) => { setMinprice(minprice + 1) }} >increase</div> */}
          </div>
        </div>



      </div>

      {/*  produtbar  */}
      <div className='grid grid-cols-4 ml-[30px] w-[100%] overflow-scroll no-scrollbar '>
        {
          products.map((item) => (
            <Productcard key={item._id} item={item} />
          ))
        }


      </div>



    </div>
  )
}

export default Showroom
