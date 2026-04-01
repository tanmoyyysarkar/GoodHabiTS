import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'global.css';


export default function RootLayout() {
  const {setColorScheme} = useColorScheme();

  useEffect(()=>{setColorScheme("system")},[])

  return (
    // Required for gesture-based navigators (pager/tab swipe) to work reliably.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='flex-1 bg-white dark:bg-page-start'>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
