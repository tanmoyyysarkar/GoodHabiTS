import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { View, ScrollView } from 'react-native';

import SettingsHeader from '@/components/settings/SettingsHeader';
import SettingsSubHeadingText from '@/components/settings/SettingsSubHeading';
import AccountCard from '@/components/settings/AccountCard';
import NotificationCard from '@/components/settings/NotificationCard';
import AppearanceCard from '@/components/settings/AppearanceCard';
import DataCard from '@/components/settings/DataCard';

const SettingsScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <View style={{ flex: 1, backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        nestedScrollEnabled
        contentContainerClassName="justify-start py-6 px-6">
        <SettingsHeader isDark={isDark} />

        <SettingsSubHeadingText text="ACCOUNT" isDark={isDark} />
        <AccountCard tokens={tokens} isDark={isDark}/>

        <SettingsSubHeadingText text="NOTIFICATIONS" isDark={isDark} />
        <NotificationCard isDark={isDark} tokens={tokens}/>

        <SettingsSubHeadingText text="APPEARANCE" isDark={isDark} />
        <AppearanceCard isDark={isDark} tokens={tokens} />

        <SettingsSubHeadingText text="DATA" isDark={isDark} />
        <DataCard isDark={isDark} tokens={tokens} />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
