import { Text } from 'react-native';

interface SettingsSubHeadingTextProps {
  isDark: boolean;
  text: string;
}

const SettingsSubHeadingText = ({ isDark, text }: SettingsSubHeadingTextProps) => {
  return (
    <Text
      className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} mb-3 mt-6 font-jetbrains-mono-light text-md`}>
      {text}
    </Text>
  );
};

export default SettingsSubHeadingText;
