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
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });
  const [openDialog,setOpenDialog]=useState(false);

  useEffect(() =>{
    const handleStorage = (e) => {
      if (!e || e.key === 'user') {
        try { setUser(JSON.parse(localStorage.getItem('user'))); } catch { setUser(null); }
      }
    };
    const handleAuthChanged = () => handleStorage({ key: 'user' });
    window.addEventListener('storage', handleStorage);
    window.addEventListener('authChanged', handleAuthChanged);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('authChanged', handleAuthChanged);
    };
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
      setUser(resp.data);
      setOpenDialog(false);
      window.dispatchEvent(new Event('authChanged'));
    })
  }

  return (
    <div className=' px-10 shadow-sm flex justify-between items-center'>
      <Link to="/">
        <img src='/logo.png' alt='Logo' className='h-24 w-auto object-contain cursor-pointer top-1 relative -left-15'
             onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/vite.svg'; }} />
      </Link>
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
              localStorage.removeItem('user');
              setUser(null);
              window.dispatchEvent(new Event('authChanged'));
            }}>Logout</Button>

       </div>
       : <Button onClick={()=>setOpenDialog(true)} className="px-5 bg-blue-500 hover:bg-blue-600 text-white">Sign In</Button> 
       }
      </div>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" className="h-16 w-auto mx-auto"/>
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button 
              onClick={login} className="w-full mt-5 flex gap-4 items-center bg-blue-500 hover:bg-blue-600 text-white">
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