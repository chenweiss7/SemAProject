import React from 'react'
consol.log(kuku2);
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <nav aria-label='main navigation'>
    <Link className='link' to='/' >Home</Link>
        <Link className='link' to='/login'>Login</Link>
        <Link className='link' to='register'>Register</Link>
    </nav>
    </>
  )
}
