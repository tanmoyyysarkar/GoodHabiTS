import { useAuth } from '@/context/AuthContext';
import { View, Text } from 'react-native';

interface SettingsHeaderProps {
  isDark: boolean;
}

const SettingsHeader = ({isDark}: SettingsHeaderProps) => {
  const { session } = useAuth();
  if (!session) return null;
  const name = session.user.user_metadata.full_name;
  const email = session.user.email;
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1 gap-2">
        <Text
          className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-black'} font-jetbrains-mono`}>
          Settings
        </Text>
        <Text
          className={`text-sm ${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono opacity-60`}>
          {name} • {email}
        </Text>
      </View>
    </View>
  );
};

export default SettingsHeader;
