import { Text, View, TextInput, Pressable, Animated } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { ThemeTokens } from '@/theme/tokens';

interface AddHobbyModalContentProps {
  onClose: () => void;
  isDark: boolean;
  tokens: ThemeTokens;
}

//TODO: name, category, emoji/icon, color, time per day

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is requred'), //later move to misc if not provided
  minutesPerDay: z.coerce.number().int().positive('Must be > 0'),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

interface ColorProp {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

interface CategoryProp {
  name: string;
  isSelected: boolean;
  onPress: () => void;
  isDark: boolean;
  selectedColor: string;
  tokens: ThemeTokens;
}

interface IconProp {
  name: string;
  isSelected: boolean;
  onPress: () => void;
  isDark: boolean;
  selectedColor: string;
  tokens: ThemeTokens;
}

const ColorBall = ({ name, isSelected, onPress }: ColorProp) => {
  return (
    <Pressable onPress={onPress}>
      <View
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ borderColor: name, borderWidth: isSelected ? 4 : 0 }}>
        <View className="h-8 w-8 rounded-full" style={{ backgroundColor: name }} />
      </View>
    </Pressable>
  );
};

const CategoryPills = ({
  name,
  isSelected,
  onPress,
  isDark,
  selectedColor,
  tokens,
}: CategoryProp) => {
  return (
    <Pressable onPress={onPress}>
      <View
        className={`${isDark ? 'border-border' : 'border-border-light'} flex h-10 items-center justify-center rounded-full border px-3`}
        style={{
          backgroundColor: isSelected ? selectedColor : tokens.cardBgElevated,
        }}>
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} text-md font-jetbrains-mono-light`}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

const IconPills = ({ name, isSelected, onPress, isDark, selectedColor, tokens }: IconProp) => {
  const scaleAnim = useRef(new Animated.Value(isSelected ? 1.08 : 1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isSelected ? 1.08 : 1,
      useNativeDriver: true,
      friction: 7,
      tension: 120,
    }).start();
  }, [isSelected, scaleAnim]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View
          className="h-16 w-16 items-center justify-center rounded-2xl border"
          style={{
            backgroundColor: isSelected ? `${selectedColor}70` : tokens.cardBgElevated,
            borderColor: isSelected ? selectedColor : tokens.border,
          }}>
          <Text className="text-2xl">{name}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const AddHobbyModalContent = ({ onClose, isDark, tokens }: AddHobbyModalContentProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', category: '', minutesPerDay: 20 },
  });

  const onSubmit = async (data: FormOutput) => {
    //TODO implement later
    console.log(data);
  };

  const [colors, setColors] = useState([
    { name: '#ff7b00', isSelected: true },
    { name: '#ffae00', isSelected: false },
    { name: '#ffea00', isSelected: false },
    { name: '#44f488', isSelected: false },
    { name: '#6085ff', isSelected: false },
    { name: '#9767ff', isSelected: false },
    { name: '#ff00b3', isSelected: false },
    { name: '#7d7395', isSelected: false },
  ]);

  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  const handleColorBallPress = (color: string) => {
    setColors((prevColors) =>
      prevColors.map((prevColor) => {
        if (prevColor.name === color) {
          setSelectedColor(color);
        }
        return {
          name: prevColor.name,
          isSelected: prevColor.name === color ? true : false,
        };
      })
    );
  };

  const [categories, setCategories] = useState([
    { name: 'Creative', isSelected: true },
    { name: 'Sport', isSelected: false },
    { name: 'Music', isSelected: false },
    { name: 'Learning', isSelected: false },
    { name: 'Wellness', isSelected: false },
    { name: 'Social', isSelected: false },
    { name: 'Misc', isSelected: false },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  const handleCategoryPillPress = (name: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((prevCategory) => {
        if (prevCategory.name === name) {
          setSelectedCategory(name);
        }
        return {
          name: prevCategory.name,
          isSelected: prevCategory.name === name ? true : false,
        };
      })
    );
  };

  const [icons, setIcons] = useState([
    { name: '🎨', isSelected: true },
    { name: '🎸', isSelected: false },
    { name: '📚', isSelected: false },
    { name: '🏃‍♂️', isSelected: false },
    { name: '🧘', isSelected: false },
    { name: '🎮', isSelected: false },
    { name: '✍️', isSelected: false },
    { name: '🍳', isSelected: false },
    { name: '📷', isSelected: false },
    { name: '🎵', isSelected: false },
    { name: '🌿', isSelected: false },
    { name: '🏊', isSelected: false },
  ]);

  const [selectedIcon, setSelectedIcon] = useState(icons[0].name);

  const handleIconPillPress = (name: string) => {
    setIcons((prevIcons) =>
      prevIcons.map((prevIcon) => {
        if (prevIcon.name === name) {
          setSelectedIcon(name);
        }
        return {
          name: prevIcon.name,
          isSelected: prevIcon.name === name ? true : false,
        };
      })
    );
  };

  return (
    <View className="flex h-full w-full">
      <View
        className={`${isDark ? 'border-b-border' : 'border-b-border-light'} w-full flex-row border border-x-0 border-t-0 p-3`}>
        <View
          className="h-16 w-16 items-center justify-center rounded-3xl"
          style={{ backgroundColor: selectedColor }}>
          <Text className="text-center text-3xl">{selectedIcon}</Text>
        </View>

        <View className="ml-3 flex justify-center">
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xl`}>
            New Hobby
          </Text>
          <Text
            className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light text-sm`}>
            Build a habit you'll love
          </Text>
        </View>
      </View>
      <View className="p-3">
        <Text
          className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} text-md mb-3 font-jetbrains-mono-bold`}>
          NAME
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="eg. Guitar"
              placeholderTextColor={tokens.textPrimary}
              value={value}
              onChangeText={onChange}
              className={`${isDark ? 'border-border bg-card-bg-elevated text-text-primary' : 'border-border-light bg-card-bg-elevated-light text-text-primary-light'}
                 mb-6 h-16 w-full rounded-2xl border px-2 font-jetbrains-mono-bold text-xl`}
            />
          )}
        />

        {errors.name && <Text>{errors.name.message}</Text>}
        <Text
          className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} text-md mb-3 font-jetbrains-mono-bold`}>
          CATEGORY
        </Text>
        <View className="mb-6 flex-row flex-wrap gap-2">
          {categories.map((category) => (
            <CategoryPills
              key={category.name}
              name={category.name}
              isSelected={category.isSelected}
              isDark={isDark}
              tokens={tokens}
              selectedColor={selectedColor}
              onPress={() => handleCategoryPillPress(category.name)}
            />
          ))}
        </View>

        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Learnings"
              placeholderTextColor={tokens.textPrimary}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.category && <Text>{errors.category.message}</Text>}

        <Text
          className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} text-md mb-3 font-jetbrains-mono-bold`}>
          ICON
        </Text>
        <View className="mb-6 flex-row flex-wrap justify-between gap-2">
          {icons.map((icon) => (
            <IconPills
              key={icon.name}
              name={icon.name}
              isSelected={icon.isSelected}
              isDark={isDark}
              tokens={tokens}
              selectedColor={selectedColor}
              onPress={() => handleIconPillPress(icon.name)}
            />
          ))}
        </View>

        <View className="flex-row">
          {colors.map((color) => (
            <ColorBall
              key={color.name}
              name={color.name}
              isSelected={color.isSelected}
              onPress={() => handleColorBallPress(color.name)}
            />
          ))}
        </View>

        <Controller
          control={control}
          name="minutesPerDay"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Minutes/day"
              placeholderTextColor={tokens.textPrimary}
              keyboardType="numeric"
              value={String(value ?? '')}
              onChangeText={onChange}
            />
          )}
        />
        {errors.minutesPerDay && <Text>{errors.minutesPerDay.message}</Text>}
      </View>
      <Pressable onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        <Text>{isSubmitting ? 'Saving...' : 'Save Hobby'}</Text>
      </Pressable>
    </View>
  );
};

export default AddHobbyModalContent;
