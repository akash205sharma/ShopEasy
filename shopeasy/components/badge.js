import React from 'react'

const badge = ({v }) => {
  return (
    <div className='left-[13px] absolute top-[-7px] bg-green-500 rounded-[100%] w-5 h-5 text-center text-white'>
        {v}
    </div>
  )
}

export default badge
