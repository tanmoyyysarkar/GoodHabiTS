import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Pressable, Text, Image } from 'react-native';

interface ProfileHeaderProps {
  isDark: boolean;
  name: string;
  link: string;
  tokens: ThemeTokens;
  avatarUrl: string;
  initials: string;
}

//==================TODO: IMPLEMENT THE PROFILE PIC FEATURE==================

const ProfileHeader = ({ isDark, link, name, tokens, avatarUrl, initials }: ProfileHeaderProps) => {
  const router = useRouter();
  const handleSettingsPress = () => {
    router.push('/settings');
  };

  return (
    <View className="flex items-center justify-center gap-3">
      <View className="flex-row items-center justify-between gap-32">
        <View className="w-8" />
        {avatarUrl !== '' ? (
          <Image source={{ uri: avatarUrl }} style={{ width: 80, height: 80, borderRadius: 40 }} />
        ) : (
          <View className="flex h-20 w-20 items-center justify-center rounded-full  bg-button-primary">
            <Text className="font-jetbrains-mono-bold text-4xl text-text-primary">{initials}</Text>
          </View>
        )}
        <Pressable onPress={() => handleSettingsPress()}>
          <Ionicons name="settings-outline" color={tokens.textPrimary} size={32} />
        </Pressable>
      </View>
      <Text
        className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
        {name}
      </Text>
      <Text
        className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} text-md font-jetbrains-mono-light`}>
        {link}
      </Text>
      <Pressable
        className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} rounded-full border px-3 py-2`}>
        <Text
          className={`text-md font-jetbrains-mono-bold ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
          Share profile
        </Text>
      </Pressable>
    </View>
  );
};

export default ProfileHeader;
