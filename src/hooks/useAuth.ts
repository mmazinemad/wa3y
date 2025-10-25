import { useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const requireConfig = () => {
    if (!isSupabaseConfigured) {
      toast.error('خدمة Supabase غير مُهيأة. الرجاء إعداد مفاتيح البيئة أولاً.');
      return false;
    }
    return true;
  };

  const signUp = async (email: string, password: string, name: string) => {
    if (!requireConfig()) return { data: null, error: 'Supabase not configured' } as const;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { name },
        },
      });

      if (error) throw error;
      toast.success('تم إنشاء الحساب بنجاح!');
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء إنشاء الحساب');
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!requireConfig()) return { data: null, error: 'Supabase not configured' } as const;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('تم تسجيل الدخول بنجاح!');
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء تسجيل الدخول');
      return { data: null, error };
    }
  };

  const signOut = async () => {
    if (!requireConfig()) return { error: 'Supabase not configured' } as const;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('تم تسجيل الخروج بنجاح');
      return { error: null };
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء تسجيل الخروج');
      return { error };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
};
