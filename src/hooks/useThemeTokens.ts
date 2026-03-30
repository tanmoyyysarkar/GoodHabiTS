import { useColorScheme } from 'nativewind';
import { inkRoseDark, inkRoseLight } from '@/theme/tokens';

export function useThemeTokens() {
  const { colorScheme } = useColorScheme();
  return colorScheme === 'dark' ? inkRoseDark : inkRoseLight;
}
