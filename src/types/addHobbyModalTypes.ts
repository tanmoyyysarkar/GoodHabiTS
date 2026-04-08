import { ThemeTokens } from '@/theme/tokens';
import { z } from 'zod';

export const addHobbySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  color: z.string().min(1, 'Color is required'),
  icon: z.string().min(1, 'Icon is required'),
  minutesPerDay: z.coerce
    .number()
    .int()
    .min(15, 'Must be at least 15m')
    .max(360, 'Must be at most 6h')
    .multipleOf(15, 'Must be in 15m intervals'),
  days: z.array(z.string()).min(1, 'At least one day must be selected'),
});

export type AddHobbyFormInput = z.input<typeof addHobbySchema>;
export type AddHobbyFormOutput = z.output<typeof addHobbySchema>;

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
