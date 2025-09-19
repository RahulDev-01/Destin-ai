import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import { Hotel } from 'lucide-react';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import { useSEO } from '@/lib/seo';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({});

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, 'AI-Trips', tripId);
      const docSnap = await getDoc(docRef); 

      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document");
        toast("No Document exists");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      toast.error("Failed to fetch trip data");
    }
  };

  // SEO for View Trip page (dynamic by location when available)
  useSEO({
    title: trip?.userSelection?.location
      ? `${trip.userSelection.location} Trip Itinerary | Destin AI`
      : 'Trip Itinerary | Destin AI',
    description: 'View your AI-generated itinerary with recommended hotels and places to visit.',
    image: '/hero.png',
  });

  return (
    <>
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
    <InfoSection trip={trip}/>
    <Hotels trip={trip}/>
    <PlacesToVisit trip={trip}/>
    <Footer trip={trip}/>
   </div> </>
  );
}

export default Viewtrip;
