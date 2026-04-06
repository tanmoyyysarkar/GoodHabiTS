import { Text } from 'react-native';

interface SubHeadingTextProps {
  isDark: boolean;
  text: string;
}

const SubHeadingText = ({ isDark, text }: SubHeadingTextProps) => {
  return (
    <Text
      className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} text-md mb-3 font-jetbrains-mono-bold`}>
      {text}
    </Text>
  );
};

export default SubHeadingText;
