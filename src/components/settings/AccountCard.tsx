import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

interface AccountCardType {
  isDark: boolean;
  tokens: ThemeTokens;
}

const AccountCard = ({ isDark, tokens }: AccountCardType) => {
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
            <View className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-950">
              <Ionicons name="person" color={'white'} size={24} />
            </View>
            <Text
              style={{ color: tokens.textPrimary }}
              className="font-jetbrains-mono-light text-lg">
              Edit Profile
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" color={tokens.textPrimary} size={24} />
        </View>
      </Pressable>
      <View style={{ height: 1, backgroundColor: tokens.border }} />
      <Pressable>
        <View className="mx-3 flex-row items-center justify-between">
          <View className="flex-row  items-center gap-3">
            <View className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-950">
              <Ionicons name="lock-closed" color={'#ffd900'} size={24} />
            </View>
            <Text
              style={{ color: tokens.textPrimary }}
              className="text-lg font-jetbrains-mono-light">
              Change Password
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" color={tokens.textPrimary} size={24} />
        </View>
      </Pressable>
    </View>
  );
};

export default AccountCard;
