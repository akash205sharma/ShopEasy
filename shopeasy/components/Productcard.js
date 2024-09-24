import React from 'react'

const Productcard = () => {
  return (
    <div className='w-[250px] h-[400px] border rounded-lg '>
      <div>
        <img src="product-1.jpg" alt="" />
      </div>
      <div className=''>
        <div>Snacks</div>
        <h2>Seeds of Change Organic Quinoe</h2>
        <div className="bg-[url('/star-y.png')] bg-repeat-x" > </div>
        <div></div>
        <div className='flex p-2 w-[100%]'>
            <div className='w-[50%] p-3 text-[20px] text-green-600 font-bold'>  $20.80</div>
            <div className='w-[50%] flex p-3 text-[20px] text-green-600 font-bold bg-green-200 rounded-lg'> <img src="cart.svg" alt="" />Add</div>
        </div>

      </div>
    </div>
  )
}

export default Productcard
