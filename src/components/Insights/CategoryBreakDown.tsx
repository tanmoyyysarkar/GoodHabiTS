import { ThemeTokens } from '@/theme/tokens';
import { Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

interface CategoryBreakDownProps {
  isDark: boolean;
  tokens: ThemeTokens;
  // PieChartData: CategoryData[];
}

const categoryColor = [
  { name: 'Creative', color: '#00cc25' },
  { name: 'Sport', color: '#c20505' },
  { name: 'Music', color: '#ab35ff' },
  { name: 'Learning', color: '#ff982a' },
  { name: 'Wellness', color: '#00d5ff' },
  { name: 'Social', color: '#ffe100' },
  { name: 'Misc', color: '#565656' },
];

const categoryData = [
  //MOCK
  { name: 'Creative', value: 28 },
  { name: 'Sport', value: 18 },
  { name: 'Music', value: 12 },
  { name: 'Learning', value: 22 },
  { name: 'Wellness', value: 10 },
  { name: 'Social', value: 6 },
  { name: 'Misc', value: 14 },
];

const CategoryBreakDown = ({ isDark, tokens }: CategoryBreakDownProps) => {
  const chartDataWithColors = categoryData.map((category) => {
    const matchedCategory = categoryColor.find((x) => x.name === category.name);
    return {
      name: category.name,
      value: category.value,
      color: matchedCategory ? matchedCategory.color : '#fff',
    };
  });

  const pieChartData = chartDataWithColors.map(({ value, color }) => ({ value, color }));
  return (
    <View
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} overflow-hidden rounded-2xl border pl-4`}>
      <View className="flex-row items-center justify-between">
        <PieChart
          data={pieChartData}
          radius={75}
          donut
          innerRadius={60}
          backgroundColor={tokens.cardBg}
        />

        <View className="flex-1 p-4">
          {chartDataWithColors.map((item) => (
            <View key={item.name} className="mb-2 flex-row items-center">
              <View className="mr-2 h-4 w-4 rounded-md" style={{ backgroundColor: item.color }} />
              <View className='w-full pr-8 pl-2 flex-row justify-between'>
                <Text
                  className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-light text-sm`}>
                  {item.name}
                </Text>
                <Text
                  className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-sm`}>
                  {item.value}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CategoryBreakDown;
