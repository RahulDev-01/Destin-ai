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
    const q = query(collection(db, 'AI-Trips'), where('userEmail', '==', user?.email))
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
    <div className='relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000'></div>

      <div className='relative px-5 py-12 sm:px-10 md:px-32 lg:px-56 xl:px-72'>
        {/* Header Section */}
        <div className='mb-12'>
          <div className='inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-sm font-medium text-blue-700 shadow-lg mb-4'>
            <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
            </svg>
            <span>Your Travel Collection</span>
          </div>
          <h2 className='font-extrabold text-4xl sm:text-5xl mb-3'>
            <span className='gradient-text'>My</span> Trips
          </h2>
          <p className='text-lg text-gray-600'>View and manage all your AI-generated travel itineraries</p>
        </div>

        {/* Trips Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {userTrips?.length > 0 ? (
            userTrips.map((trip, index) => (
              <UserTripCard trip={trip} key={trip?.id || index} onDelete={handleTripDelete} />
            ))
          ) : (
            // Loading Skeletons
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className='h-[280px] w-full rounded-3xl overflow-hidden shadow-lg'
              >
                <div className='h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse relative'>
                  <div className='absolute inset-0 bg-gradient-to-t from-gray-400/50 to-transparent'></div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {userTrips?.length === 0 && (
          <div className='text-center py-16'>
            <div className='inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-6'>
              <svg className='h-12 w-12 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>No trips yet</h3>
            <p className='text-gray-600 mb-6'>Start planning your first adventure with AI</p>
            <a
              href='/create-trip'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl'
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