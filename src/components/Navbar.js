import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {token} = useSelector((state)=> state.auth);
  return (
    <div className=' bg-orange-500 w-full rounded-lg ' >
    <nav className='flex justify-between item-center mx-auto max-w-6xl h-14 py-4  ' >
      <div>
        My App
      </div>
      <div className=' mx-2 px-2 gap-x-2 ' >
      { token===null && (<Link to="/" className=' mx-2 px-2 gap-x-2 ' >
        Signup
      </Link>)}
      { token===null && (<Link to="/login">
        Login
      </Link>)}
      </div>
      
      
      {/* { token!==null && (<Link to="/home">
        Home
      </Link>)} */}
      { token!==null && (<Link to="/logout">
        Logout
      </Link>)}
    </nav>
    </div>
  )
}

export default Navbar
