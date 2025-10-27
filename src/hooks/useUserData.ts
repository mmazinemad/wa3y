
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
        toast.error(err.message || 'فشل تحميل بيانات المستخدم');
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
      toast.error('يجب تسجيل الدخول لتحديث الملف الشخصي');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updates);
      toast.success('تم تحديث الملف الشخصي بنجاح!');
    } catch (err: any) {
      console.error("Error updating profile:", err);
      toast.error(err.message || 'فشل تحديث الملف الشخصي');
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
};
