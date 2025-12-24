import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCard from './components/UserTripCard';
import { useSEO } from '@/lib/seo';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  // SEO for My Trips page
  useSEO({
    title: 'My Trips | Destin AI',
    description: 'View and manage your saved AI-generated itineraries.',
    image: '/hero.png',
  });
  useEffect(() => {
    GetUserTrips();
  }, [])
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('User') || localStorage.getItem('user') || localStorage.getItem('UserProfile'));
    if (!user) {
      navigate('/login?next=/my-trips');
      return;
    }
    setUserTrips([]);
    const q = query(collection(db, 'AI-Trips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      trips.push(data);
    });

    // Sort trips by timestamp in descending order (newest first)
    // Handle trips that might not have a timestamp field
    trips.sort((a, b) => {
      const timeA = a.timestamp?.toMillis?.() || a.timestamp || 0;
      const timeB = b.timestamp?.toMillis?.() || b.timestamp || 0;
      return timeB - timeA;
    });

    setUserTrips(trips);
  }

  const handleTripDelete = (deletedTripId) => {
    setUserTrips(prevTrips => prevTrips.filter(trip => trip.id !== deletedTripId));
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-10 sm:py-16'>
        {/* Header Section */}
        <div className='mb-10 sm:mb-16 text-center sm:text-left px-2'>

          <h2 className='font-black text-3xl sm:text-5xl md:text-6xl mb-4 text-gray-900 tracking-tight'>
            My <span className='stunning-text'>Trips</span> ✈️
          </h2>
          <p className='text-sm sm:text-xl text-gray-600 max-w-2xl font-medium leading-relaxed'>
            Explore and manage your collection of AI-crafted adventures around the globe.
          </p>
        </div>

        {/* Trips Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8'>
          {userTrips?.length > 0 ? (
            userTrips.map((trip, index) => (
              <UserTripCard trip={trip} key={trip?.id || index} onDelete={handleTripDelete} />
            ))
          ) : (
            // Loading Skeletons
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className='h-[240px] w-full rounded-2xl overflow-hidden shadow-md'
              >
                <div className='h-full w-full bg-gray-100 animate-pulse'></div>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {userTrips?.length === 0 && (
          <div className='text-center py-16'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-5'>
              <svg className='h-10 w-10 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>No trips yet</h3>
            <p className='text-gray-600 mb-6'>Start planning your first adventure with AI</p>
            <a
              href='/create-trip'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg'
            >
              <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
              </svg>
              Create Your First Trip
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyTrips