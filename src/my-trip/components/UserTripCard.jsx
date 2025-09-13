import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getRelevantImageUrl, buildSeededPhotoURL } from '@/service/Globalapi';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function UserTripCard({ trip, onDelete }) {
  const [coverUrl, setCoverUrl] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(()=>{
    const fetchPhoto = async()=>{
      try{
        const q = trip?.userSelection?.location;
        if(!q) return;
        const url = await getRelevantImageUrl(q,{width:600,height:200});
        setCoverUrl(url);
      }catch(err){
        setCoverUrl(buildSeededPhotoURL(trip?.userSelection?.location,{width:600,height:200}));
      }
    };
    fetchPhoto();
  },[trip?.userSelection?.location]);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'AI-Trips', trip.id));
      toast.success('Trip deleted successfully!');
      onDelete && onDelete(trip.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast.error('Failed to delete trip. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  return (
    <div className='border rounded-xl hover:shadow-md hover:scale-[1.01] transition-all overflow-hidden relative group'>
      <Link to={`/view-trip/${trip?.id}`}>
        <img
          src={coverUrl||'/image.png'}
          alt='cover'
          className='w-full h-[140px] object-cover'
          onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = buildSeededPhotoURL(trip?.userSelection?.location,{width:600,height:200}); }}
        />
        <div className='p-3 flex flex-col gap-2'>
          <h3 className='font-semibold text-lg truncate'>{trip?.userSelection?.location||'Trip'}</h3>
          <div className='flex flex-wrap gap-2 text-sm text-gray-600'>
            <span className='bg-gray-100 rounded-full px-2 py-1'>📅 {trip?.userSelection?.noOfDays} days</span>
            <span className='bg-gray-100 rounded-full px-2 py-1'>💰 {trip?.userSelection?.budget}</span>
            <span className='bg-gray-100 rounded-full px-2 py-1'>👥 {trip?.userSelection?.Peoples}</span>
          </div>
        </div>
      </Link>
      
      {/* Delete Button */}
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50 cursor-pointer'
        title='Delete trip '
      >
        {isDeleting ? (
          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
        ) : (
          <FaTrash className='w-4 h-4' />
        )}
      </button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Trip</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this trip to <strong>{trip?.userSelection?.location}</strong>? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-4 sm:gap-4">
            <Button 
              variant="outline" 
              onClick={handleDeleteCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                  Deleting...
                </>
              ) : (
                'Delete Trip'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserTripCard


