import { ScrollView, View } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import HobbiesHeader from '@/components/Hobbies/HobbiesHeader';
import SearchBox from '@/components/Hobbies/SearchBox';
import CategoryPills from '@/components/Hobbies/CategoryPills';
import HobbyWithMiniHeatMap from '@/components/Hobbies/HobbyWithMiniHeatMap';
import { HobbyHeatmapItem } from '@/types/HobbyHeatMapItem';

const HobbiesScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const HobbyData: HobbyHeatmapItem[] = [
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
      startDay: 5, //thu -> 5
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
      startDay: 3,
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
      startDay: 2,
    },
  ];

  const DetailedHobbyCards = HobbyData.map((data) => (
    <HobbyWithMiniHeatMap key={data.name} isDark={isDark} tokens={tokens} data={data} />
  ));

  return (
    <View className="flex-1 pt-8" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView className="flex-1" contentContainerClassName="gap-8 px-6">
        <HobbiesHeader isDark={isDark} tokens={tokens} activeHobbies={3} totalTime={179} />
        <SearchBox isDark={isDark} tokens={tokens} />
        <CategoryPills isDark={isDark} />
        {DetailedHobbyCards}
        <View className='h-24 w-max' />
      </ScrollView>
    </View>
  );
};

export default HobbiesScreen;
