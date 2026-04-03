import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

interface CategoryPillProps {
  isDark: boolean;
}

const CategoryPills = ({ isDark }: CategoryPillProps) => {
  const [categories, setCategories] = useState([
    { name: 'All', isActive: true },
    { name: 'Creative', isActive: false },
    { name: 'Fitness', isActive: false },
    { name: 'Learning', isActive: false },
  ]);

  const handlePress = (selectedCategory: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isActive: category.name === selectedCategory,
      })),
    );
  };

  return (
    <View className="flex-row flex-wrap gap-2">
      {categories.map((category) => (
        <Pressable
          key={category.name}
          onPress={() => handlePress(category.name)}
          className={`h-10 items-center justify-center rounded-full border px-4 ${
            category.isActive
              ? isDark
                ? 'border-border bg-white'
                : 'border-border-light bg-card-bg-elevated'
              : isDark
                ? 'border-border bg-card-bg'
                : 'border-border-light bg-card-bg-light'
          }`}>
          <Text
            className={`font-jetbrains-mono-semibold ${
              category.isActive
                ? isDark
                  ? 'text-black'
                  : 'text-white'
                : isDark
                  ? 'text-text-secondary'
                  : 'text-text-secondary-light'
            }`}>
            {category.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default CategoryPills;
