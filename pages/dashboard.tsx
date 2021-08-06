import React from 'react'
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router'
const dashboard = () => {
  const [session] = useSession();
  const router = useRouter();

  if(!session) {
    router.push('/');
  }

  return (
    <div>
      <h2>My Recipes</h2>
      <h1>My Saved Recipes</h1>
      <button className="btn-danger" onClick={() => signOut()}>Signout</button>
    </div>
  )
}

export default dashboard
