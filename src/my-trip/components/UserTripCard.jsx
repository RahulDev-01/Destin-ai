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

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const q = trip?.userSelection?.location;
        if (!q) return;
        const url = await getRelevantImageUrl(q, { width: 600, height: 200 });
        setCoverUrl(url);
      } catch (err) {
        setCoverUrl(buildSeededPhotoURL(trip?.userSelection?.location, { width: 600, height: 200 }));
      }
    };
    fetchPhoto();
  }, [trip?.userSelection?.location]);

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
    <div className='group bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative flex flex-col h-full'>
      <Link to={`/view-trip/${trip?.id}`} className='flex flex-col h-full'>
        <div className='relative h-[180px] sm:h-[200px] overflow-hidden'>
          <img
            src={coverUrl || '/image.png'}
            alt='cover'
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = buildSeededPhotoURL(trip?.userSelection?.location, { width: 600, height: 400 }); }}
          />
          <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
        </div>
        <div className='p-5 sm:p-6 flex flex-col gap-3 flex-1'>
          <h3 className='font-black text-xl sm:text-2xl text-gray-900 group-hover:text-blue-600 transition-colors truncate'>
            {trip?.userSelection?.location || 'Trip'}
          </h3>
          <div className='flex flex-wrap gap-2'>
            <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-black text-gray-600'>
              <span className='font-semibold text-xs'>Days:</span> {trip?.userSelection?.noOfDays} Days
            </span>
            <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-black text-blue-600'>
              <span className='font-semibold text-xs'>Budget:</span> {trip?.userSelection?.budget}
            </span>
            <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-xs font-black text-purple-600'>
              <span className='font-semibold text-xs'>Travelers:</span> {trip?.userSelection?.Peoples}
            </span>
          </div>
        </div>
      </Link>

      {/* Delete Button */}
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-red-500 hover:text-white text-red-500 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg transform hover:rotate-12 active:scale-90 disabled:opacity-50 cursor-pointer z-10'
        title='Delete trip'
      >
        {isDeleting ? (
          <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin'></div>
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


