import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

interface CategoryType {
  name: string;
  isSelected: boolean;
}

interface CategoryPillProps {
  isDark: boolean;
  category: CategoryType;
  handleCategoryPillPress: () => void;
}

const CategoryPill = ({ isDark, category, handleCategoryPillPress }: CategoryPillProps) => {
  return (
    <Pressable
      key={category.name}
      onPress={handleCategoryPillPress}
      className={`h-10 items-center justify-center rounded-full border px-4 ${
        category.isSelected
          ? isDark
            ? 'border-border bg-white'
            : 'border-border-light bg-card-bg-elevated'
          : isDark
            ? 'border-border bg-card-bg'
            : 'border-border-light bg-card-bg-light'
      }`}>
      <Text
        className={`font-jetbrains-mono-semibold ${
          category.isSelected
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
  );
};

export default CategoryPill;
