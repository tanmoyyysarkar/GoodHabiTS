import { useThemeTokens } from '@/hooks/useThemeTokens';
import { ReactNode } from 'react';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

type AuthFormCardProps = {
  children: ReactNode;
  className?: string;
};

const AuthFormCard = ({ children, className = '' }: AuthFormCardProps) => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      className={`gap-5 rounded-2xl border p-5 ${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} ${className}`}
      style={{
        shadowColor: tokens.border,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 5,
      }}>
      {children}
    </View>
  );
};

export default AuthFormCard;
