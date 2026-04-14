import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import ThemeSliderButton from './ThemeSliderButton';
import { useSettings } from '@/context/SettingsContext';

interface AppearanceCardType {
  isDark: boolean;
  tokens: ThemeTokens;
}

const AppearanceCard = ({ isDark, tokens }: AppearanceCardType) => {
  const { colorSchemePreference } = useSettings();
  const themeIcon =
    colorSchemePreference === 'dark'
      ? 'moon'
      : colorSchemePreference === 'light'
        ? 'sunny'
        : 'desktop';
  return (
    <View
      className="w-full gap-3 rounded-2xl py-3"
      style={{
        backgroundColor: tokens.cardBg,
        borderColor: tokens.border,
        borderWidth: 0.5,
      }}>
      <Popover
        placement={PopoverPlacement.CENTER}
        popoverStyle={{ backgroundColor: 'transparent' }}
        from={
          <Pressable>
            <View
              style={{ borderColor: tokens.border }}
              className="mx-3 flex-row items-center justify-between">
              <View className="flex-row  items-center gap-3">
                <View className="flex h-12 w-12 items-center justify-center">
                  <Ionicons name={themeIcon} color={tokens.textPrimary} size={24} />
                </View>
                <Text
                  style={{ color: tokens.textPrimary }}
                  className="font-jetbrains-mono-light text-lg">
                  Theme
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" color={tokens.textPrimary} size={24} />
            </View>
          </Pressable>
        }>
        <View
          className="rounded-full"
          style={{
            maxWidth: 250,
          }}>
          <ThemeSliderButton tokens={tokens} />
        </View>
      </Popover>

      <View style={{ height: 0.5, backgroundColor: tokens.border }} />

      <Pressable>
        <View className="mx-3 flex-row items-center justify-between">
          <View className="flex-row  items-center gap-3">
            <View className="flex h-12 w-12 items-center justify-center">
              <Text className="text-2xl">🎨</Text>
            </View>
            <View>
              <Text
                style={{ color: tokens.textPrimary }}
                className="font-jetbrains-mono-light text-lg">
                Heatmap Color
              </Text>
              <Text
                style={{ color: tokens.textTertiary }}
                className="font-jetbrains-mono-light text-sm">
                Blue
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" color={tokens.textPrimary} size={24} />
        </View>
      </Pressable>
    </View>
  );
};

export default AppearanceCard;
