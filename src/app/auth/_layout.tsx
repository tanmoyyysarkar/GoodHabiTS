import { useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';

const AuthLayout = () => {
  const { session, loading, authEvent } = useAuth();
  const allowRecovery = authEvent === "PASSWORD_RECOVERY";

  if (loading) return null;
  if (session && !allowRecovery) return <Redirect href="/"/>

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="google-callback" />
    </Stack>
  );
};

export default AuthLayout;
