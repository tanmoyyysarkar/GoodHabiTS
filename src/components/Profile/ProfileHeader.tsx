import { View, Pressable, Text } from 'react-native';

interface ProfileHeaderProps {
  isDark: boolean;
  name: string;
  link: string;
}

//==================TODO: IMPLEMENT THE PROFILE PIC FEATURE==================

const ProfileHeader = ({ isDark, link, name }: ProfileHeaderProps) => {
  return (
    <View className="flex items-center justify-center gap-3">
      <Pressable>
        <View className="flex h-20 w-20 items-center justify-center rounded-full  bg-button-primary">
          <Text className="font-jetbrains-mono-bold text-4xl text-text-primary">AR</Text>
        </View>
      </Pressable>
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
        <Text className="text-md font-jetbrains-mono-bold text-text-primary">Share profile</Text>
      </Pressable>
    </View>
  );
};

export default ProfileHeader;
