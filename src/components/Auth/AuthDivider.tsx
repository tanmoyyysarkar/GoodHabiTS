import { useColorScheme } from 'nativewind';
import { Text, View } from 'react-native';

type AuthDividerProps = {
  text: string;
};

const AuthDivider = ({ text }: AuthDividerProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-row items-center gap-3">
      <View
        className={`h-[1px] flex-1 ${isDark ? 'bg-border' : 'bg-border-light'}`}
        style={{ opacity: 0.5 }}
      />
      <Text
        className={`font-jetbrains-mono text-xs ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
        {text}
      </Text>
      <View
        className={`h-[1px] flex-1 ${isDark ? 'bg-border' : 'bg-border-light'}`}
        style={{ opacity: 0.5 }}
      />
    </View>
  );
};

export default AuthDivider;
