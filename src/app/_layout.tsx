import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import '../../global.css';

import { AuthProvider } from '@/context/AuthContext';
import { SettingsProvider } from '@/context/SettingsContext';

export default function RootLayout() {
  const tokens = useThemeTokens();
  const [fontsLoaded] = useFonts({
    Handwriting: require('@expo-google-fonts/caveat/400Regular/Caveat_400Regular.ttf'),
    HandwritingBold: require('@expo-google-fonts/caveat/700Bold/Caveat_700Bold.ttf'),
    JetBrainsMonoLight: require('@expo-google-fonts/jetbrains-mono/300Light/JetBrainsMono_300Light.ttf'),
    JetBrainsMono: require('@expo-google-fonts/jetbrains-mono/400Regular/JetBrainsMono_400Regular.ttf'),
    JetBrainsMonoSemiBold: require('@expo-google-fonts/jetbrains-mono/600SemiBold/JetBrainsMono_600SemiBold.ttf'),
    JetBrainsMonoBold: require('@expo-google-fonts/jetbrains-mono/700Bold/JetBrainsMono_700Bold.ttf'),
    PlusJakartaSansLight: require('@expo-google-fonts/plus-jakarta-sans/300Light/PlusJakartaSans_300Light.ttf'),
    PlusJakartaSans: require('@expo-google-fonts/plus-jakarta-sans/400Regular/PlusJakartaSans_400Regular.ttf'),
    PlusJakartaSansSemiBold: require('@expo-google-fonts/plus-jakarta-sans/600SemiBold/PlusJakartaSans_600SemiBold.ttf'),
    PlusJakartaSansBold: require('@expo-google-fonts/plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SettingsProvider>
      <AuthProvider>
        {/* Required for gesture-based navigators (pager/tab swipe) to work reliably. */}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView className="flex-1" style={{ backgroundColor: tokens.pageBg }}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: 'simple_push',
                contentStyle: { backgroundColor: tokens.pageBg },
              }}
            />
          </SafeAreaView>
        </GestureHandlerRootView>
      </AuthProvider>
    </SettingsProvider>
  );
}
