import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { View, ScrollView } from 'react-native';
import SettingsHeader from '@/components/settings/SettingsHeader';
import SettingsSubHeadingText from '@/components/settings/SettingsSubHeading';
const SettingsScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <View style={{ flex: 1, backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        nestedScrollEnabled
        contentContainerClassName="items-center justify-start py-6 px-6 pb-24">
        <SettingsHeader isDark={isDark} />

        <SettingsSubHeadingText text='ACCOUNT' isDark={isDark}/>
        <SettingsSubHeadingText text='NOTIFICATIONS' isDark={isDark}/>
        <SettingsSubHeadingText text='APPEARANCE' isDark={isDark}/>
        <SettingsSubHeadingText text='DATA' isDark={isDark}/>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
