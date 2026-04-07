import signInWithPassword from '@/lib/supabase/signInWithPassword';
import signOut from '@/lib/supabase/signOut';
import signUp from '@/lib/supabase/signUp';
import { supabase } from '@/lib/supabase/supabase';
import { Session } from '@supabase/supabase-js';
import { SplashScreen } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signup: (email: string, password: string, full_name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

SplashScreen.preventAutoHideAsync();

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  signup: (_email: string, _password: string, _full_name: string) => Promise.resolve(),
  login: (_email: string, _password: string) => Promise.resolve(),
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
    const { success, data, errorMessage } = await signUp(email, password, full_name);
    if (!success) {
      console.log(errorMessage);
      return;
    }
    setSession(data.session);
    console.log(data.session?.user); //DELETE LATER
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const { success, data, errorMessage } = await signInWithPassword(email, password);
    if (!success) {
      console.log(errorMessage);
      return;
    }
    setSession(data.session);
    console.log(data.session?.user); //DELETE LATER
    setLoading(false);
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
