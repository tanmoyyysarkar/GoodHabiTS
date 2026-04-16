import { supabase } from '@/lib/supabase/supabase';
import signInWithPassword from '@/lib/supabase/auth/signInWithPassword';
import signOut from '@/lib/supabase/auth/signOut';
import signUp from '@/lib/supabase/auth/signUp';
import getReadableAuthError from '@/lib/supabase/auth/getReadableAuthError';

import { Session } from '@supabase/supabase-js';
import { SplashScreen } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type AuthActionResult = {
  success: boolean;
  errorMessage?: string;
};

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signup: (email: string, password: string, full_name: string) => Promise<AuthActionResult>;
  login: (email: string, password: string) => Promise<AuthActionResult>;
  logout: () => Promise<void>;
}

SplashScreen.preventAutoHideAsync();

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  signup: (_email: string, _password: string, _full_name: string) => Promise.resolve({ success: true }),
  login: (_email: string, _password: string) => Promise.resolve({ success: true }),
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //check existing session on app startup
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    //listen for state change (login, logout, token refresh)
    const { data: AuthListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    //cleanup
    return () => AuthListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  const signup: AuthContextType['signup'] = async (
    email: string,
    password: string,
    full_name: string
  ) => {
    const result = await signUp(email, password, full_name);
    if (!result.success) {
      return {
        success: false,
        errorMessage: getReadableAuthError(result.errorMessage),
      };
    }
    setSession(result.data.session);
    setLoading(false);
    return { success: true };
  };

  const login: AuthContextType['login'] = async (email: string, password: string) => {
    const result = await signInWithPassword(email, password);
    if (!result.success) {
      return {
        success: false,
        errorMessage: getReadableAuthError(result.errorMessage),
      };
    }
    setSession(result.data.session);
    setLoading(false);
    return { success: true };
  };

  const logout = async () => {
    if (session) {
      const { success, errorMessage } = await signOut();
      if (!success) {
        console.log(errorMessage);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ session, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
