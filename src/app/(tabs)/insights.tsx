import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeTokens } from "@/hooks/useThemeTokens";

export default function Insights() {
  const tokens = useThemeTokens();

  return (
    <LinearGradient
      colors={tokens.pageBg as unknown as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1">
      <ScrollView className="flex-1" contentContainerClassName="flex-1 items-center justify-center">
        <Text style={{ color: tokens.textPrimary }} className="text-xl font-semibold">
          Insights
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}
