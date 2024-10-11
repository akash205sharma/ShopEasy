 "use client"

import React from 'react'
import { fetchproduct } from '@/actions/product';


const page = (params) => {

  const {product_id} = params.params;

  let Product;

  const fetchProductById = async () => {
    Product = await fetchproduct(product_id) // Fetch products with the new state values
    
  };

  fetchProductById();

  // console.log(Product);
  

  return (
    <div>
      {product_id}
    </div>
  )
}

export default page


