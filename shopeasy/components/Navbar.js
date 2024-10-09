"use client"
import React from 'react'
import Badge from './badge'
import ItemSearch from './ItemSearch'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Myaccount from './myaccount'
import { decodeBase64, encodeBase64 } from 'bcryptjs'
function Navbar() {
  const { data, session } = useSession();
  return (
    <div className=' bg-banner bg-contain sticky top-0 bg-white z-10'>
      <div className='flex items-center h-[120px] w-[98vw]'>
        <img width={150}  src="logo.png" alt="" />
        <div className='flex border border-green-500 rounded-md w-[740px] mr-28 ml-10 p-0 '>
          <ItemSearch />
          <input className='w-full outline-none ' type="text" placeholder='Search For items' />
          <img width={30} height={30} src="search.png" alt="" />
        </div>

        <div className='flex justify-between'>
          <div className='flex w-[110px] h-[30px] align-bottom items-end relative' >
            <img src="icon-compare.svg" alt="" /> Compare <Badge v={3} />
          </div>
          <div className='flex w-[110px] h-[30px] align-bottom items-end relative' >
            <img src="heart.svg" alt="" />Wishlist <Badge v={5} />
          </div>
          <div className='flex w-[110px] h-[30px] align-bottom items-end relative' >
            <img src="cart.svg" alt="" /> Cart <Badge v={5} />
          </div>
          <Myaccount />
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

