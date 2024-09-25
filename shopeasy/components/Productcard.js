import React from 'react'

const Productcard = ({item}) => {
  const star=item.rating*20;
  console.log(item);
  console.log("ggg");
  
  
  return (
    <div className='pb-[26rem] m-4 p-5 pt-0 w-[250px] h-[400px] border rounded-lg '>
      <div>
        <img src={item.img} alt="" />
      </div>
      <div className='flex flex-col space-y-1 '>
        <div className='text-gray-600' >{item.category}</div>
        <h2 className=' font-bold' >{item.name}</h2>
        <div className='flex align-middle space-x-2'>
          <div className="bg-star-b bg-contain w-[73px] h-[15px]"><div style={{ width: `${star}%` }} className={`bg-star-y bg-contain h-[15px]`}></div> </div>
          <div className='text-[15px]' >({item.rating})</div>
        </div>
        <div className='text-[15px]' > By <span className='text-green-600'>{item.company}</span> </div>
        <div className='flex p-2 w-[100%] mb-10'>
          <div className='w-[50%] p-3 text-[20px] text-green-600 font-bold'>  ${item.price}</div>
          <div className='w-[50%] flex p-3 text-[20px] text-green-600 font-bold bg-green-200 rounded-lg'> <img src="cart.svg" alt="" />Add</div>
        </div>

      </div>
    </div>
  )
}

export default Productcard
