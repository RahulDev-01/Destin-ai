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
import { Link, NavLink } from 'react-router-dom';



function Header() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });
  const [openDialog,setOpenDialog]=useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header className='px-4 md:px-8 lg:px-10 shadow-sm sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
      <div className='flex h-16 items-center justify-between'>
        {/* Left: Logo */}
        <div className='flex items-center gap-3'>
          <button className='md:hidden p-2 rounded-md hover:bg-gray-100' aria-label='Toggle Menu' onClick={()=>setMobileOpen(v=>!v)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <Link to="/" className='inline-flex items-center gap-2'>
            <img src='/logo.png' alt='Logo' className='h-15 ml-18 w-auto object-contain'
                onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/vite.svg'; }} />

          </Link>
        </div>

        {/* Center: Nav links (desktop) */}
        <nav className='hidden md:flex items-center gap-2'>
          <NavLink to="/" end className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Home</NavLink>
          <NavLink to="/create-trip" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Create Trip</NavLink>
          <NavLink to="/my-trips" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>My Trips</NavLink>
        </nav>

        {/* Right: Actions */}
        <div className='flex items-center gap-3'>

          {/* Auth section */}
          {user ? (
            <div className='hidden md:flex items-center gap-3'>
              <Link to="/create-trip"><Button variant="outline" className="rounded-full">Create Trip</Button></Link>
              <Link to="/my-trips"><Button variant="outline" className="rounded-full">My Trips</Button></Link>
              <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg" alt="User avatar" className='rounded-full w-[38px] h-[38px]' />
              <Button variant="outline" className="rounded-full" onClick={()=>{
                googleLogout();
                localStorage.removeItem('user');
                setUser(null);
                window.dispatchEvent(new Event('authChanged'));
              }}>Logout</Button>
            </div>
          ) : (
            <Link to="/login">
              <Button className="px-5 bg-blue-500 hover:bg-blue-600 text-white">Sign In</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='md:hidden border-t bg-white'>
          <div className='px-4 py-3 flex flex-col gap-2'>
            <NavLink to="/" end className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`} onClick={()=>setMobileOpen(false)}>Home</NavLink>
            <NavLink to="/create-trip" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`} onClick={()=>setMobileOpen(false)}>Create Trip</NavLink>
            <NavLink to="/my-trips" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`} onClick={()=>setMobileOpen(false)}>My Trips</NavLink>
            {user && (
              <div className='flex items-center justify-between mt-2'>
                <div className='flex items-center gap-2'>
                  <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg" className='rounded-full w-8 h-8' />
                  <span className='text-sm text-gray-700'>Logged in</span>
                </div>
                <Button variant="outline" size="sm" onClick={()=>{ googleLogout(); localStorage.removeItem('user'); setUser(null); setMobileOpen(false); window.dispatchEvent(new Event('authChanged')); }}>Logout</Button>
              </div>
            )}
          </div>
        </div>
      )}

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

    </header>
  )
}

export default Header