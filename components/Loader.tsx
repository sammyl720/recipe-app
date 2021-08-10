import React from 'react'

const Loader = () => {
  let common = 'h-2.5 w-2.5 bg-current rounded-full'
  return (
    <div className='loader'>
      <div className={`${common} mr-1 animate-bounce`} />
      <div className={`${common} mr-1  animate-bounce200`} />
      <div className={`${common} animate-bounce400`} />
    </div>
  )
}

export default Loader
