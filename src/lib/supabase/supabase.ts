import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Access the variables directly so Metro can statically replace them
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

// 2. Validate them after they've been statically replaced
if (!supabaseUrl) {
  throw new Error('Missing required environment variable: EXPO_PUBLIC_SUPABASE_URL');
}

if (!supabaseKey) {
  throw new Error('Missing required environment variable: EXPO_PUBLIC_SUPABASE_KEY');
}

// 3. Initialize your client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'implicit',
  },
});
