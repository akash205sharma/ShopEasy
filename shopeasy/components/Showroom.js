import React from 'react'
import Productcard from './Productcard'
import data from '@/public/data.json'
const Showroom = () => {
  return (
    <div className='min-h-[calc(100vh-120px)] w-[100vw] flex'>
      {/* //sidebar
      produtbar */}
      <div className='h-[full] w-[350px]  '></div>


      <div className='grid grid-cols-4 ml-[30px] w-[100%]  '>

        {data.map((item, index) => (
          <Productcard key={index} item={item} />
        ))}

      </div>
    </div>
  )
}

export default Showroom
