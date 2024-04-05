import React from 'react'

function Navbar() {
  return (
    <nav className='bg-blue-800 text-white'>
      <div className="flex  justify-center items-center logo h-14">
        <span className="font-bold text-xl mx-8">MyTodo</span>

      </div>

      {/* <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all duration-10'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-10'>Your Tasks</li>
        <li></li>
      </ul> */}
    </nav>
  )
}

export default Navbar
