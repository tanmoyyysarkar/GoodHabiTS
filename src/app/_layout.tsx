import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'global.css';

declare global {
  namespace ReactNavigation {
    interface Theme {
      colors: {
        primary: string;
        background: string;
        card: string;
        text: string;
        border: string;
        notification: string;
        secondary: string;
        accent: string;
      };
    }
  }
}

const LightAppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0EA5E9',
    secondary: '#06B6D4',
    text: '#0F172A',
    background: '#F8FAFC',
    card: '#FFFFFF',
    border: '#E0E7FF',
    notification: '#EF4444',
    accent: '#06B6D4',
  },
};

const DarkAppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#0EA5E9',
    secondary: '#06b5d4a2',
    text: '#F1F5F9',
    background: '#111827',
    card: '#1F2937',
    border: '#374151',
    notification: '#F87171',
    accent: '#06B6D4',
  },
};

export default function RootLayout() {
  const [isDark, setIsDark] = useState<boolean>(true);

  const theme = isDark ? DarkAppTheme : LightAppTheme;

  return (
    <ThemeProvider value={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </ThemeProvider>
  );
}
