import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

interface NotificationCardType {
  isDark: boolean;
  tokens: ThemeTokens;
}

const NotificationCard = ({ isDark, tokens }: NotificationCardType) => {
  return (
    <View
      className="w-full gap-3 rounded-2xl py-3"
      style={{
        backgroundColor: tokens.cardBg,
        borderColor: tokens.border,
        borderWidth: 1,
      }}>
      <Pressable>
        <View
          style={{ borderColor: tokens.border }}
          className="mx-3 flex-row items-center justify-between">
          <View className="flex-row  items-center gap-3">
            <View className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-800">
              <Text className='text-xl'>🔔</Text>
            </View>
            <View>
              <Text
                style={{ color: tokens.textPrimary }}
                className="font-jetbrains-mono-light text-lg">
                Daily Reminder
              </Text>
              <Text
                style={{ color: tokens.textTertiary }}
                className="font-jetbrains-mono-light text-sm">
                9:00 PM
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" color={tokens.textPrimary} size={24} />
        </View>
      </Pressable>
      <View style={{ height: 1, backgroundColor: tokens.border }} />
      <Pressable>
        <View className="mx-3 flex-row items-center justify-between">
          <View className="flex-row  items-center gap-3">
            <View
              className="flex h-12 w-12 items-center justify-center rounded-2xl
              bg-yellow-800">
              <Text className="text-xl">📊</Text>
            </View>
            <View>
              <Text
                style={{ color: tokens.textPrimary }}
                className="font-jetbrains-mono-light text-lg">
                Weekly recap
              </Text>
              <Text
                style={{ color: tokens.textTertiary }}
                className="font-jetbrains-mono-light text-xs">
                Sundays
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" color={tokens.textPrimary} size={24} />
        </View>
      </Pressable>
      <View style={{ height: 1, backgroundColor: tokens.border }} />
      <Pressable>
        <View className="mx-3 flex-row items-center justify-between">
          <View className="flex-row  items-center gap-3">
            <View className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-800">
              <Text className='text-xl'>😴</Text>
            </View>
            <View>
              <Text
                style={{ color: tokens.textPrimary }}
                className="font-jetbrains-mono-light text-lg">
                Inactivity Nudge
              </Text>
              <Text
                style={{ color: tokens.textTertiary }}
                className="font-jetbrains-mono-light text-xs">
                After 3 days
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" color={tokens.textPrimary} size={24} />
        </View>
      </Pressable>
    </View>
  );
};

export default NotificationCard;
