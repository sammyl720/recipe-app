import React from 'react'
import Link from 'next/link'
export default function Navbar() {
  return (
    <div className='w-100 p-2 bg-black text-white'>
      <nav className='mx-auto max-w-lg w-100 flex justify-between'>
        <Link href='/'>
          <a className='flex items-center justify-center text-white'>
            LOGO
          </a>
        </Link>
        <ul className='flex gap-2 list-none'>
          <li>
            <Link href='/'>
              <a className='flex items-center justify-center text-white'>
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href='/about'>
              <a className='flex items-center justify-center text-white'>
                About
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
