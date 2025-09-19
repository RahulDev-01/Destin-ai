import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCard from './components/UserTripCard';
import { useSEO } from '@/lib/seo';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips,setUserTrips] = useState([]);
    
    // SEO for My Trips page
    useSEO({
      title: 'My Trips | Destin AI',
      description: 'View and manage your saved AI-generated itineraries.',
      image: '/hero.png',
    });
    useEffect(() =>{
        GetUserTrips();
    },[])
    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('User') || localStorage.getItem('user') || localStorage.getItem('UserProfile'));
        if(!user){
            navigate('/');
            return ;
        }
        setUserTrips([]);
        const q=query(collection(db,'AI-Trips'),where('userEmail','==',user?.email))
        const querySnapshot = await getDocs(q);
        const trips = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          trips.push(data);
        });
    setUserTrips(trips);
  }

  const handleTripDelete = (deletedTripId) => {
    setUserTrips(prevTrips => prevTrips.filter(trip => trip.id !== deletedTripId));
  }
  
  return (
    <div className='px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72'>
      <h2 className='font-bold text-3xl mb-10'>My Trips</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 my-3'>
        {userTrips?.length>0 ? userTrips.map((trip,index)=>(
            <UserTripCard trip={trip} key={trip?.id||index} onDelete={handleTripDelete} />
        ))
        : [1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='h-[200px] w-full bg-slate-200 animate-pulse rounded-xl'>
            </div>
        ))
        }
      </div>
    </div>
  )
}

export default MyTrips