import React from 'react'
import Link from 'next/link'
const banner = () => {
    return (
        <div className='m-4 rounded-xl relative flex bg-banner h-[420px]  w-[97vw] bg-contain  '>
            <div className='p-16 w-[45vw]'>
                <div className='font-sans text-[40px] font-semibold text-[#253D4E]'>
                    Stay home & get your daily
                    needs from our shop
                </div>
                <div className='pt-5 text-[18px] text-gray-600' >Start You&apos;r Daily Shopping with <span className='text-green-400'> ShopEasy</span> </div>
                <div className='mt-10 rounded-full w-[30vw] flex bg-white justify-between ' >
                    <div className='bg-plane2 bg-contain w-[29px] h-[30px] top-4 left-6 relative '></div>
                    <input name type="text" placeholder='Your email address' />
                    <Link href={"/signup"}><div className=' hover:bg-green-500 active:bg-green-600  bg-green-600 p-5 rounded-full font-bold text-white pl-10 pr-10 '>Subscribe</div></Link>
                </div>
            </div>
            <div className='bg-banner2 bg-contain bg-no-repeat absolute right-0 bottom-0 w-[40vw] h-[300px] '></div>

        </div>
    )
}

export default banner
