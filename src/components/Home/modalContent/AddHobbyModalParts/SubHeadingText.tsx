import { Text } from 'react-native';
import { isDirty } from 'zod/v3';

interface props {
  isDark: boolean;
  text: string;
}

const SubHeadingText = ({ isDark, text }: props) => {
  return (
    <Text
      className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} text-md mb-3 font-jetbrains-mono-bold`}>
      {text}
    </Text>
  );
};

export default SubHeadingText;
