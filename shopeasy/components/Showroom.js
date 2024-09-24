import React from 'react'
import Productcard from './Productcard'
const Showroom = () => {
  return (
    <div className='h-[calc(100vh-120px)] flex'>
      {/* //sidebar
      produtbar */}
        <div className='h-[100%] w-[300px] bg-green-600 '></div>
        <div>
<Productcard/>

        </div>

    </div>
  )
}

export default Showroom
