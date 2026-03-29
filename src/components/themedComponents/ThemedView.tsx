import { View, ViewProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface ThemedViewProps extends ViewProps {
  bg?: 'background' | 'card'; // 'background' or 'card'
}

export default function ThemedView({ bg = 'background', style, ...props }: ThemedViewProps) {
  const { colors } = useTheme();
  const backgroundColor = bg === 'card' ? colors.card : colors.background;

  return (
    <View
      style={[
        {
          backgroundColor,
          borderColor: colors.border,
        },
        style
      ]}
      {...props}
    />
  );
}
