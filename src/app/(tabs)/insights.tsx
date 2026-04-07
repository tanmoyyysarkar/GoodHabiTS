import { View, Text, ScrollView } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';

export default function Insights() {
  const tokens = useThemeTokens();

  return (
    <View className="flex-1" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView className="flex-1" contentContainerClassName="flex-1 items-center justify-center">
        <Text style={{ color: tokens.textPrimary }} className="text-xl font-semibold">
          Insights
        </Text>
      </ScrollView>
    </View>
  );
}
