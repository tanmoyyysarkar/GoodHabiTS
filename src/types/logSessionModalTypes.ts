import { ThemeTokens } from '@/theme/tokens';

export interface HeaderProps {
  isDark: boolean;
  tokens: ThemeTokens;
  onClose: () => void;
}

export interface HobbyItem {
  name: string;
  icon: string;
  streakCount: number;
  color: string;
  minutesPerDay: number;
}

export interface LogSessionHeaderProps extends HeaderProps {
  hobby: HobbyItem;
}

export interface HobbyDetail extends HobbyItem {
  isDark: boolean;
  tertiaryTextColor: string;
  onPress: () => void;
  tokens: ThemeTokens;
}

export interface Mood {
  emoji: string;
  color: string;
  name: string;
}

export interface MoodPillProp {
  emoji: string;
  color: string;
  name: string;
  tokens: ThemeTokens;
  onPress: () => void;
  isSelected: boolean;
}

export interface Time {
  hours: number;
  minutes: number;
}

export interface LogSessionMenuFooterProps {
  isDark: boolean;
  renderedColor: string;
  selectedMoodName?: string;
  onCancel: () => void;
  onSubmit: () => void;
}
