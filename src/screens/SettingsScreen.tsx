import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import SettingsHeader from '@/components/settings/SettingsHeader';
import SettingsSubHeadingText from '@/components/settings/SettingsSubHeading';
import AccountCard from '@/components/settings/AccountCard';
import NotificationCard from '@/components/settings/NotificationCard';
import AppearanceCard from '@/components/settings/AppearanceCard';
import DataCard from '@/components/settings/DataCard';
import { Ionicons } from '@expo/vector-icons';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

const SettingsScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [notifPopoverVisible, setNotifPopoverVisible] = useState(false);

  // Close all popovers when screen loses focus (back nav, tab switch, etc.)
  useFocusEffect(
    useCallback(() => {
      return () => {
        setNotifPopoverVisible(false); // runs on blur/unmount
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: tokens.pageBg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        nestedScrollEnabled
        contentContainerClassName="justify-start py-6 px-6">
        <SettingsHeader isDark={isDark} />

        <SettingsSubHeadingText text="ACCOUNT" isDark={isDark} />
        <AccountCard tokens={tokens} isDark={isDark} />

        <View className="flex-row items-center justify-between">
          <SettingsSubHeadingText text="NOTIFICATIONS" isDark={isDark} />
          <TouchableOpacity onPress={() => setNotifPopoverVisible(true)}>
            <Ionicons name="information-circle" color={tokens.textPrimary} size={24} />
          </TouchableOpacity>
          <Popover
            isVisible={notifPopoverVisible}
            onRequestClose={() => setNotifPopoverVisible(false)}
            placement={PopoverPlacement.CENTER}
            popoverStyle={{ backgroundColor: 'transparent' }}
          >
            <View
              className="px-3 py-2"
              style={{
                backgroundColor: tokens.cardBgElevated,
                borderRadius: 14,
                maxWidth: 220,
                borderWidth: 1,
                borderColor: tokens.border,
              }}>
              <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                <Text
                  style={{
                    color: tokens.textSecondary,
                    fontSize: 13,
                    lineHeight: 18,
                    flexShrink: 1,
                  }}>
                  Notifications will be implemented soon!
                  Currently only the Theme setting works for light and dark mode
                </Text>
              </View>
            </View>
          </Popover>
        </View>
        <NotificationCard isDark={isDark} tokens={tokens} />

        <SettingsSubHeadingText text="APPEARANCE" isDark={isDark} />
        <AppearanceCard isDark={isDark} tokens={tokens} />

        <SettingsSubHeadingText text="DATA" isDark={isDark} />
        <DataCard isDark={isDark} tokens={tokens} />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
