import HobbyBreakDownCard from '@/components/Profile/HobbyBreakDownCard';
import MilestoneCard from '@/components/Profile/MilestoneCard';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileSubHeadingText from '@/components/Profile/ProfileSubHeadingText';
import QuickProfileInsightsCard from '@/components/Profile/QuickProfileInsightsCard';
import ThisYearInsights from '@/components/Profile/ThisYearInsights';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

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

  return (
    <LinearGradient
      colors={tokens.pageBg as unknown as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1">
      <ScrollView
        className="flex-1"
        nestedScrollEnabled
        contentContainerClassName="items-center justify-start py-6 px-6 pb-24">
        <ProfileHeader isDark={isDark} link={profileData.link} name={profileData.name} />
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
          <ProfileSubHeadingText text="MILESTONES" isDark={isDark} />
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
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;
