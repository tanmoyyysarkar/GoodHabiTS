import { View, Text, Pressable, Image } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';
import { useAuth } from '@/context/AuthContext';

interface HomeHeaderProps {
  greeting?: string;
  name?: string;
  avatar?: string;
  isDark: boolean;
  tokens: ThemeTokens;
  onProfilePress?: () => void;
}

const HomeHeader = ({
  greeting = 'Good morning',
  name = '',
  avatar = '',
  isDark,
  tokens,
  onProfilePress,
}: HomeHeaderProps) => {
  const { session } = useAuth();
  console.log(session?.user.user_metadata);
  const avatarUrl = session?.user.user_metadata?.avatar_url;
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <Text
          className={`text-lg ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-semibold opacity-70`}>
          {greeting}
        </Text>
        <Text
          className={`mt-2 font-handwriting-bold text-4xl ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
          {name} 👋
        </Text>
      </View>

      {/* Avatar with accent color */}
      {avatarUrl ? (
        <Pressable
          onPress={onProfilePress}
          className="flex h-14 w-14 items-center justify-center rounded-full active:opacity-70">
          <Image source={{ uri: avatarUrl }} style={{ width: 56, height: 56, borderRadius: 28 }} />
        </Pressable>
      ) : (
        <Pressable
          onPress={onProfilePress}
          className="flex h-14 w-14 items-center justify-center rounded-full active:opacity-70"
          style={{ backgroundColor: tokens.buttonPrimary }}>
          <Text className="font-jetbrains-mono-bold text-lg text-white">{avatar}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default HomeHeader;
