import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type AuthTextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

const AuthTextField = ({ label, error, style, ...props }: AuthTextFieldProps) => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="gap-2">
      <Text
        className={`font-jetbrains-mono-semibold ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
        {label}
      </Text>
      <TextInput
        placeholderTextColor={isDark ? '#8aa0cf' : '#242c40'}
        className="rounded-xl border px-4 py-3 font-jetbrains-mono"
        style={[
          {
            borderColor: isDark ? '#6b6b6b' : '#000000',
            color: tokens.textPrimary,
            backgroundColor: isDark ? tokens.cardBgElevated : tokens.cardBg,
          },
          style,
        ]}
        {...props}
      />
      {!!error && <Text className="font-jetbrains-mono text-sm text-red-500">{error}</Text>}
    </View>
  );
};

export default AuthTextField;
