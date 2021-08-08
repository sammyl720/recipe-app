import React from 'react'
import { useSession, signIn } from 'next-auth/client'
import Image from 'next/image';
import Link from 'next/link'
export default function Navbar() {
  const [ session ] = useSession()
  return (
    <div className='w-100 bg-secondary text-white xs:px-2 xl:px-0'>
      <nav className='mx-auto w-100 container max-w-4xl flex justify-between items-center py-2 '>
        <Link href='/'>
          <a className='flex items-center justify-center'>
            <Image src='/favicon-32x32.png' width='32' height='32' alt='logo' />
          </a>
        </Link>
        <ul className='flex gap-4 list-none font-medium text-lg self-end'>
          {session ? (
            <>
              <li className='flex items-center justify-center cursor-pointer'>
                <Link href='/dashboard'>
                  <a>
                    <Image src={session.user.image} className='rounded-full' width='32' height='32' alt='logo' />
                  </a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className='flex items-center justify-center'>
                <button className='btn-secondary' onClick={() => signIn()}>
                  Login
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}
