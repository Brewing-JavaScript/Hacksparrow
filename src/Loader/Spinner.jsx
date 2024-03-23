
import React from 'react'

const Loader = () => {
  return (
    <div className='w-full flex-col h-screen gap-4 flex items-center justify-center'>
      <h1 className='text-2xl font-bold text-center'> Wait!!! Sending  Mail</h1>
      <div className='loader'></div>
    </div>
  )
}

export default Loader