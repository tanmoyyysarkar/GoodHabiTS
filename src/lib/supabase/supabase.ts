import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const getRequiredEnv = (name: 'EXPO_PUBLIC_SUPABASE_URL' | 'EXPO_PUBLIC_SUPABASE_KEY'): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItem(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItem(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = getRequiredEnv('EXPO_PUBLIC_SUPABASE_URL');
const supabaseKey = getRequiredEnv('EXPO_PUBLIC_SUPABASE_KEY');

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
