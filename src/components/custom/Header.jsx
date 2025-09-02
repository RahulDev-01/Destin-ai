import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
// Removed Popover import to avoid missing module errors
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { Link } from 'react-router-dom';



function Header() {
  const user=JSON.parse(localStorage.getItem('user'));
  const [openDialog,setOpenDialog]=useState(false);

  
  useEffect(() =>{
    console.log(user)
  },[])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })
  
  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers: {
       Authorization: `Bearer ${tokenInfo?.access_token}`,
       Accept:'Application/json'
      }
    }).then((resp) => {console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-4'>
      <>
        <img src='/logo.svg' alt='Logo' className='h-10 w-auto'
             onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/vite.svg'; }} />
      </>
      <div >
       {user? 
       <div className='flex items-center gap-4'>
        <a href="/create-trip">
         <Button variant="outline" className= "rounded-full">Create Trip</Button> 
        </a>
        <a href="/my-trips">
        <Button variant="outline" className= "rounded-full">My Trips </Button> 
        </a>
         <div className='relative'>
           <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg" className='rounded-full w-[38px] h-[38px]' />
         </div>
         <Button variant="outline" className="rounded-full" onClick={()=>{
              googleLogout();
              localStorage.clear();
              window.location.href='/';
            }}>Logout</Button>

       </div>
       : <Button onClick={()=>setOpenDialog(true)}>Sign In</Button> 
       }
      </div>
      
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg"/>
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button 
              onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7"/>
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Header