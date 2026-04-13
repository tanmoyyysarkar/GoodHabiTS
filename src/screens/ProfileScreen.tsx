import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import HobbyBreakDownCard from '@/components/Profile/HobbyBreakDownCard';
import LogOutButton from '@/components/Profile/LogOutButton';
import MilestoneCard from '@/components/Profile/MilestoneCard';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileSubHeadingText from '@/components/Profile/ProfileSubHeadingText';
import QuickProfileInsightsCard from '@/components/Profile/QuickProfileInsightsCard';
import ThisYearInsights from '@/components/Profile/ThisYearInsights';

import { useAuth } from '@/context/AuthContext';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [profileData, setProfileData] = useState({
    name: 'Arjun Rao',
    link: 'good-habits.app/arjunrao886',
  });

  const [quickProfileInsights, setQuickProfileInsights] = useState([
    {
      name: 'total hours',
      value: 142,
    },
    {
      name: 'best streak',
      value: 17,
    },
    {
      name: 'hobbies',
      value: 3,
    },
  ]);

  const [mileStoneData, setMileStoneData] = useState([
    {
      name: 'First log',
      emoji: '🎯',
      isAchieved: true,
    },
    {
      name: '7-day streak',
      emoji: '🔥',
      isAchieved: true,
    },
    {
      name: '100 hrs',
      emoji: '⏱️',
      isAchieved: true,
    },
    {
      name: '150 hrs',
      emoji: '⌛',
      isAchieved: false,
    },
    {
      name: '30-day streak',
      emoji: '🏆',
      isAchieved: false,
    },
  ]);

  const yearInsightsData = [
    {
      name: 'Sessions logged',
      value: '84',
    },
    {
      name: 'Avg. session',
      value: '38 min',
    },
    {
      name: 'Most active day',
      value: 'Sunday',
    },
    {
      name: 'Total hours',
      value: '53 hrs',
    },
  ];

  const { logout } = useAuth();

  return (
    <View className="flex-1" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        nestedScrollEnabled
        contentContainerClassName="items-center justify-start py-6 px-6 pb-24">
        <ProfileHeader
          isDark={isDark}
          link={profileData.link}
          name={profileData.name}
          tokens={tokens}
        />
        <View className="my-4 w-full flex-row items-center justify-between">
          {quickProfileInsights.map((insight) => (
            <QuickProfileInsightsCard
              isDark={isDark}
              name={insight.name}
              value={insight.value}
              tokens={tokens}
              key={insight.name}
            />
          ))}
        </View>
        <View className="flex w-full justify-start">
          <View className="flex-row justify-between items-center">
            <ProfileSubHeadingText text="MILESTONES" isDark={isDark} />
            <Popover
              placement={PopoverPlacement.LEFT}
              popoverStyle={{ backgroundColor: 'transparent' }}
              from={
                <TouchableOpacity>
                  <Ionicons name="information-circle" color={tokens.textPrimary} size={24} />
                </TouchableOpacity>
              }>
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
                    Milestones feature will be implemented soon!
                  </Text>
                </View>
              </View>
            </Popover>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="flex-row gap-3">
            {mileStoneData.map((mileStone) => (
              <MilestoneCard
                emoji={mileStone.emoji}
                isAchieved={mileStone.isAchieved}
                name={mileStone.name}
                key={mileStone.name}
                tokens={tokens}
              />
            ))}
          </ScrollView>
          <ProfileSubHeadingText text="HOBBY BREAKDOWN" isDark={isDark} />
          <HobbyBreakDownCard isDark={isDark} tokens={tokens} />
          <ProfileSubHeadingText text="THIS YEAR" isDark={isDark} />
          <ThisYearInsights isDark={isDark} data={yearInsightsData} tokens={tokens} />
          <LogOutButton text="Logout" onPress={logout} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
