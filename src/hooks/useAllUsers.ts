
import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { toast } from 'sonner';
import { UserProfile } from '@/types';

export const useAllUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProfile));
      setUsers(usersData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching users:", err);
      setError(err);
      toast.error("Failed to fetch users.");
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = refetch();
    return () => unsubscribe();
  }, [refetch]);

  const updateUser = async (userId: string, data: Partial<UserProfile>) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, data);
      toast.success("User updated successfully.");
    } catch (err: any) {
      console.error("Error updating user:", err);
      toast.error(err.message || "Failed to update user.");
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      toast.success("User data deleted successfully.");
    } catch (err: any) {
      console.error("Error deleting user:", err);
      toast.error(err.message || "Failed to delete user data.");
    }
  };

  return { users, loading, error, updateUser, deleteUser, refetch };
};
