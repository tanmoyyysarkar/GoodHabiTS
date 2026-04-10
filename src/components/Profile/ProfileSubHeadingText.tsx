import { Text } from 'react-native';

interface ProfileSubHeadingTextProps {
  isDark: boolean;
  text: string;
}

const ProfileSubHeadingText = ({ isDark, text }: ProfileSubHeadingTextProps) => {
  return (
    <Text
      className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} text-sm mb-3 mt-6 font-jetbrains-mono-light`}>
      {text}
    </Text>
  );
};

export default ProfileSubHeadingText;
