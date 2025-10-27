
import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import { UserProfile } from '@/types';

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        if (doc.exists()) {
          setProfile(doc.data() as UserProfile);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }, (err) => {
        console.error("Error fetching user data:", err);
        setError(err);
        toast.error(err.message || 'Failed to fetch user data.');
        setLoading(false);
      });

      return () => unsub();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      toast.error('You must be logged in to update your profile.');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updates);
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      console.error("Error updating profile:", err);
      toast.error(err.message || 'Failed to update profile.');
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
};
