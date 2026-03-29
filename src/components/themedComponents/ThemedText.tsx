import { Text, TextProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function ThemedText({ style, ...props }: TextProps) {
  const { colors } = useTheme();

  return (
    <Text
      style={[{ color: colors.text }, style]}
      {...props}
    />
  );
}
