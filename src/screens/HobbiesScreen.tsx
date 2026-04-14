import { useEffect, useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { useColorScheme } from 'nativewind';

import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useAuth } from '@/context/AuthContext';
import {
  getHobby30DaySummary,
  MonthlySummaryData,
} from '@/lib/supabase/hobbies/getHobby30DaySummary';

import HobbiesHeader from '@/components/Hobbies/HobbiesHeader';
import SearchBox from '@/components/Hobbies/SearchBox';
import CategoryPill from '@/components/Hobbies/CategoryPill';
import HobbyWithMiniHeatMap from '@/components/Hobbies/HobbyWithMiniHeatMap';

const HobbiesScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [categories, setCategories] = useState([
    { name: 'All', isSelected: true },
    { name: 'Creative', isSelected: false },
    { name: 'Sport', isSelected: false },
    { name: 'Music', isSelected: false },
    { name: 'Learning', isSelected: false },
    { name: 'Wellness', isSelected: false },
    { name: 'Social', isSelected: false },
    { name: 'Misc', isSelected: false },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchText, setSearchText] = useState<string>('');

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

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    if (!session) return;
    setRefreshing(true);

    await Promise.all([load30DaysSummary()]);

    setSearchText('');
    setSelectedCategory('All');
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isSelected: category.name === 'All',
      }))
    );
    setRefreshing(false);
  };

  const filteredHobbies = hobbySummary30days.filter((hobby) => {
    const categoryMatches =
      selectedCategory === 'All' ||
      hobby.category?.toLowerCase() === selectedCategory.toLowerCase();

    const nameMatches = hobby.name.toLowerCase().includes(searchText.trim().toLowerCase());

    return categoryMatches && nameMatches;
  });

  const DetailedHobbyCards = filteredHobbies.map((data) => (
    <HobbyWithMiniHeatMap key={data.name} isDark={isDark} tokens={tokens} data={data} />
  ));

  const handleCategoryPillPress = (selectedCategory: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isSelected: category.name === selectedCategory,
      }))
    );
    setSelectedCategory(selectedCategory);
  };

  return (
    <View className="flex-1 pt-8" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-6"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <HobbiesHeader isDark={isDark} tokens={tokens} activeHobbies={3} totalTime={179} />
        <SearchBox
          isDark={isDark}
          tokens={tokens}
          searchText={searchText}
          onSearchTextChange={setSearchText}
        />

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
