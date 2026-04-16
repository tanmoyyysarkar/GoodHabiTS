import { useEffect, useState } from 'react';
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
import {
  AllTimeHobbyStats,
  fetchAllTimeHobbyStats,
} from '@/lib/supabase/profile/fetchAllTimeHobbyStats';
import {
  fetchProfileHeaderStats,
  ProfileHeaderStatsData,
} from '@/lib/supabase/profile/fetchProfileHeaderStats';
import {
  fetchThisYearStats,
  YearInsightsDataType,
} from '@/lib/supabase/profile/fetchThisYearStats';

//=============================PROFILE-SCREEN-STARTS-HERE=================================
const ProfileScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { session } = useAuth();

  const fullName = session ? session.user.user_metadata.full_name : '';
  const initials = fullName
    .split(' ')
    .map((word: string) => word[0])
    .join('');
  const avatarUrl = session ? session.user.user_metadata.avatar_url : '';

  const [profileHeaderStats, setProfileHeaderStats] = useState<ProfileHeaderStatsData[]>([]);
  const loadProfileHeaderStats = async () => {
    const { success, data, errorMessage } = await fetchProfileHeaderStats();
    if (!success) {
      console.log(errorMessage);
      return;
    }
    setProfileHeaderStats(data as ProfileHeaderStatsData[]);
  };

  const [hobbyBreakDownData, setHobbyBreakDownData] = useState<AllTimeHobbyStats[]>([]);
  const loadHobbyBreakdownMetrics = async () => {
    const { success, data, errorMessage } = await fetchAllTimeHobbyStats();
    if (!success) {
      console.log(errorMessage);
      return;
    }
    setHobbyBreakDownData(data as AllTimeHobbyStats[]);
  };

  const [yearInsightsData, setYearInsightsData] = useState<YearInsightsDataType[]>([]);
  const loadYearInsightsData = async () => {
    const { success, data, errorMessage } = await fetchThisYearStats();
    if (!success) {
      console.log(errorMessage);
      return;
    }
    setYearInsightsData(data as YearInsightsDataType[]);
  };

  useEffect(() => {
    void loadHobbyBreakdownMetrics();
    void loadProfileHeaderStats();
    void loadYearInsightsData();
  }, []);

  const headerStats = profileHeaderStats[0] ?? {
    streak: 0,
    total_hobbies: 0,
    total_minutes: 0,
  };

  //TODO: implement proper milestones
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

  const { logout } = useAuth();

  return (
    <View className="flex-1" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerClassName="items-center justify-start py-6 px-6 pb-24">
        <ProfileHeader
          isDark={isDark}
          link={'good-habits.app/to-be-implemented'}
          name={fullName}
          avatarUrl={avatarUrl}
          tokens={tokens}
          initials={initials}
        />
        <View className="my-4 w-full">
          <QuickProfileInsightsCard
            isDark={isDark}
            tokens={tokens}
            bestStreak={headerStats.streak}
            hobbyCount={headerStats.total_hobbies}
            totalMinutes={headerStats.total_minutes}
          />
        </View>
        <View className="flex w-full justify-start">
          <View className="flex-row items-center justify-between">
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
                    These are just dummy cards. Milestones feature will be implemented soon!
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
          <HobbyBreakDownCard isDark={isDark} tokens={tokens} data={hobbyBreakDownData} />
          <ProfileSubHeadingText text="THIS YEAR" isDark={isDark} />
          <ThisYearInsights isDark={isDark} data={yearInsightsData} tokens={tokens} />
          <LogOutButton text="Logout" onPress={logout} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
