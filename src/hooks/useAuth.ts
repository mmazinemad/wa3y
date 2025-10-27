
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/integrations/firebase/client';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        role: 'user',
        title: '',
        bio: '',
        pannerImageUrl: '',
        image: '',
        socialMediaLinks: [],
        createdAt: serverTimestamp(),
      });

      toast.success('تم إنشاء الحساب بنجاح!');
      return { user, error: null };
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء إنشاء الحساب');
      return { user: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('تم تسجيل الدخول بنجاح!');
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء تسجيل الدخول');
      return { user: null, error };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success('تم تسجيل الخروج بنجاح');
      return { error: null };
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء تسجيل الخروج');
      return { error };
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
};
