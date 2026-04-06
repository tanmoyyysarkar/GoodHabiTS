import { ThemeTokens } from '@/theme/tokens';

export interface ColorProp {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

export interface CategoryProp {
  name: string;
  isSelected: boolean;
  onPress: () => void;
  isDark: boolean;
  selectedColor: string;
  tokens: ThemeTokens;
}

export interface IconProp {
  name: string;
  isSelected: boolean;
  onPress: () => void;
  isDark: boolean;
  selectedColor: string;
  tokens: ThemeTokens;
}

export interface AddHobbyHeaderProps {
  isDark: boolean;
  selectedColor: string;
  selectedIcon: string;
}

export interface AddHobbyFooterProps {
  isDark: boolean;
  selectedColor: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSave: () => void;
}
