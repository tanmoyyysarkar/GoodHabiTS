import { Text } from 'react-native';

interface InsightsSubHeadingTextProps {
  isDark: boolean;
  text: string;
}

const InsightsSubHeadingText = ({ isDark, text }: InsightsSubHeadingTextProps) => {
  return (
    <Text
      className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} mb-3 mt-6 font-jetbrains-mono-light text-md`}>
      {text}
    </Text>
  );
};

export default InsightsSubHeadingText;
