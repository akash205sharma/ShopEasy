import React from 'react'
import Badge from './badge'
import ItemSearch from './ItemSearch'


function Navbar() {
  return (
    <div className=''>    
      <div className='flex items-center h-[120px] w-[98vw]'>
        <img src="https://nest-frontend-v6.vercel.app/assets/imgs/theme/logo.svg" alt="" />

        <div className='flex border border-green-500 rounded-md  w-[740px] mr-28 ml-10 p-2 '>
          <ItemSearch />
          <input className='w-full outline-none ' type="text" placeholder='Search For items' />
          <img width={30} height={30} src="search.png" alt="" />
        </div>

        <div className='flex justify-between'>
          <div className='flex w-[110px] h-[30px] align-bottom items-end relative' >
            <img src="icon-compare.svg" alt="" /> Compare <Badge v={5} />
          </div>
          <div className='flex w-[110px] h-[30px] align-bottom items-end relative' >
            <img src="heart.svg" alt="" />Wishlist <Badge v={5} />
          </div>
          <div className='flex w-[110px] h-[30px] align-bottom items-end relative' >
            <img src="cart.svg" alt="" /> Cart <Badge v={5} />
          </div>
          <div className='flex w-[110px] h-[30px] align-bottom items-end ' >
            <img src="user.svg" alt="" /> Account 
          </div>
        </div>
      </div>

      {/* <div className=''>
        <div></div>
        <div>

        </div>
        <div></div>
      </div> */}

    </div>
  )
}

export default Navbar

