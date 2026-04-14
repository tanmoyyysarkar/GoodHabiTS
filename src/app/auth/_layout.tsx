import { useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';

const AuthLayout = () => {
  const { session, loading } = useAuth();

  if (loading) return null;
  if (session) return <Redirect href="/"/>

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="callback" />
    </Stack>
  );
};

export default AuthLayout;
