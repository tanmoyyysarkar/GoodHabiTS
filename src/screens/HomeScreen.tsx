import StreakBox from '@/components/StreakBox';
import ThemedText from '@/components/themedComponents/ThemedText';
import ThemedView from '@/components/themedComponents/ThemedView';
import { Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <ThemedView className="flex-1">
      <ThemedView className="mx-6 my-2 flex-row items-center justify-between">
        <ThemedView>
          <ThemedText className="font-base text-xl opacity-40">Good morning.</ThemedText>
          <ThemedText className="p-1 text-4xl font-semibold">Arjun 👋</ThemedText>
        </ThemedView>
        <View className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500">
          <Text className="text-xl font-bold text-white">AR</Text>
        </View>
      </ThemedView>
      <StreakBox />
    </ThemedView>
  );
};

export default HomeScreen;
