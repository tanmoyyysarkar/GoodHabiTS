import { useAuth } from '@/context/AuthContext';
import SettingsScreen from '@/screens/SettingsScreen';
import { Redirect } from 'expo-router';

export default function settings() {
  const { session } = useAuth();
  if (!session) return <Redirect href="/auth/login" />;
  return <SettingsScreen />;
}
