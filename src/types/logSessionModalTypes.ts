import { ThemeTokens } from '@/theme/tokens';

export interface ModalHeaderProps {
  isDark: boolean;
  tokens: ThemeTokens;
  onClose: () => void;
}

export interface HobbySession {   //directly used for the list for selecing a hobby to log a session for
  id: string;
  name: string;
  icon: string;
  streakCount: number;
  color: string;
  minutesPerDay: number;
}

export interface LogSessionHeaderProps extends ModalHeaderProps {
  hobby: HobbySession;
}

export interface HobbyListItemProps extends HobbySession {
  isDark: boolean;
  tertiaryTextColor: string;
  onPress: () => void;
}

export interface LogSessionMenuProps extends HobbySession {
  isDark: boolean;
  tertiaryTextColor: string;
  onBackToList: () => void;
  tokens: ThemeTokens;
}

export interface Mood {
  emoji: string;
  color: string;
  name: string;
  value: number;
}

export interface MoodPillProps {
  emoji: string;
  color: string;
  name: string;
  tokens: ThemeTokens;
  onPress: () => void;
  isSelected: boolean;
}

export interface SessionDuration {
  hours: number;
  minutes: number;
}

export interface LogSessionMenuFooterProps {
  isDark: boolean;
  accentColor: string;
  selectedMoodName?: string;
  onCancel: () => void;
  onSubmit: () => void;
}
