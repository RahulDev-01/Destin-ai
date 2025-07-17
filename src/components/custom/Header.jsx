import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
   <>
{/* Logo */}
<div className='p-2 shadow-sm flex justify-between items-center  px-3 mt-[2px]'>
    <img src="/logo.svg" alt="" />
    <div>
        <Button className='cursor-pointer text-[16px] '>Sign In</Button>
    </div>
</div>
   </>
  )
}

export default Header