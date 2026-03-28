import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import 'global.css';

const LightAppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#b261ec',
    text: '#0F172A',
    background: '#F8FAFC',
    card: '#FFFFFF',
    border: '#E2E8F0',
    notification: '#EF4444',
  },
};

const DarkAppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#38BDF8',
    text: '#E2E8F0',
    background: '#020617',
    card: '#0F172A',
    border: '#1E293B',
    notification: '#F87171',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkAppTheme : LightAppTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
