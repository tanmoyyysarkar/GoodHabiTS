import { ScrollView, View } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import HobbiesHeader from '@/components/Hobbies/HobbiesHeader';
import SearchBox from '@/components/Hobbies/SearchBox';
import CategoryPill from '@/components/Hobbies/CategoryPill';
import HobbyWithMiniHeatMap from '@/components/Hobbies/HobbyWithMiniHeatMap';
import { useEffect, useState } from 'react';
import { getHobby30DaySummary, MonthlySummaryData } from '@/lib/supabase/getHobby30DaySummary';
import { useAuth } from '@/context/AuthContext';

const HobbiesScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [categories, setCategories] = useState([
    { name: 'Creative', isSelected: true },
    { name: 'Sport', isSelected: false },
    { name: 'Music', isSelected: false },
    { name: 'Learning', isSelected: false },
    { name: 'Wellness', isSelected: false },
    { name: 'Social', isSelected: false },
    { name: 'Misc', isSelected: false },
  ]);

  const { session } = useAuth();
  const [hobbySummary30days, setHobbySummary30days] = useState<MonthlySummaryData[]>([]);

  const load30DaysSummary = async () => {
    if (!session) {
      setHobbySummary30days([]);
      return;
    }
    const { success, data, errorMessage } = await getHobby30DaySummary();
    if (!success) {
      console.log(errorMessage);
      return;
    }
    const mappedSummary: MonthlySummaryData[] =
      (data as MonthlySummaryData[] | undefined)?.map((hobby) => ({
        color: hobby.color,
        hobby_id: hobby.hobby_id,
        icon: hobby.icon,
        last_30_days_minutes: hobby.last_30_days_minutes,
        name: hobby.name,
        streak_score: hobby.streak_score,
        target_minutes: hobby.target_minutes,
        category: hobby.category,
      })) ?? [];
    setHobbySummary30days(mappedSummary);
  };

  useEffect(() => {
    void load30DaysSummary();
  }, [session]);

  const HobbyData = [
    {
      name: 'Guitar',
      color: '#504aa6b9',
      category: 'Creative',
      emoji: '🎸',
      totalHours: 68,
      streakCount: 12,
      totalTimePerDay: 90,
      timeDoneToday: 60,
      timeDonePerDay: [
        0, 15, 20, 10, 35, 45, 25, 30, 55, 40, 20, 0, 15, 25, 40, 60, 50, 30, 20, 10, 45, 55, 30,
        35, 25, 15, 20, 10, 50, 60,
      ],
    },
    {
      name: 'Running',
      color: '#22c55eb9',
      category: 'Fitness',
      emoji: '🏃‍♂️',
      totalHours: 42,
      streakCount: 7,
      totalTimePerDay: 60,
      timeDoneToday: 30,
      timeDonePerDay: [
        0, 10, 15, 20, 25, 30, 15, 20, 35, 40, 30, 20, 10, 0, 15, 25, 30, 35, 20, 15, 10, 20, 30,
        40, 35, 25, 20, 15, 30, 45,
      ],
    },
    {
      name: 'Sketching',
      color: '#e90e0eb9',
      category: 'Learning',
      emoji: '🏊‍♂️',
      totalHours: 29,
      streakCount: 4,
      totalTimePerDay: 45,
      timeDoneToday: 18,
      timeDonePerDay: [
        0, 5, 10, 15, 20, 25, 10, 5, 0, 10, 15, 20, 25, 30, 20, 15, 10, 5, 0, 10, 15, 20, 25, 15,
        10, 5, 0, 10, 20, 25,
      ],
    },
  ];

  const DetailedHobbyCards = hobbySummary30days.map((data) => (
    <HobbyWithMiniHeatMap key={data.name} isDark={isDark} tokens={tokens} data={data} />
  ));

  const handleCategoryPillPress = (selectedCategory: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isSelected: category.name === selectedCategory,
      }))
    );
  };

  return (
    <View className="flex-1 pt-8" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView className="flex-1" contentContainerClassName="gap-8 px-6">
        <HobbiesHeader isDark={isDark} tokens={tokens} activeHobbies={3} totalTime={179} />
        <SearchBox isDark={isDark} tokens={tokens} />

        <View className="flex-row flex-wrap gap-2">
          {categories.map((category) => {
            return (
              <CategoryPill
                key={category.name}
                isDark={isDark}
                category={category}
                handleCategoryPillPress={() => handleCategoryPillPress(category.name)}
              />
            );
          })}
        </View>
        {DetailedHobbyCards}
        <View className="h-24 w-max" />
      </ScrollView>
    </View>
  );
};

export default HobbiesScreen;
