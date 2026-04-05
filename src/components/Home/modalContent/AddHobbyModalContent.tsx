import { Text, View, TextInput, Pressable, Animated } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { ThemeTokens } from '@/theme/tokens';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

interface AddHobbyModalContentProps {
  onClose: () => void;
  isDark: boolean;
  tokens: ThemeTokens;
}

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is requred'),
  color: z.string().min(1, 'Color is required'),
  icon: z.string().min(1, 'Icon is required'),
  minutesPerDay: z.coerce
    .number()
    .int()
    .min(15, 'Must be at least 15m')
    .max(360, 'Must be at most 6h')
    .multipleOf(15, 'Must be in 15m intervals'),
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

const formatMinutes = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

//===================================================COLOR-BALL==========================================================
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

//=============================================SELECT-CATEGORY-PILL======================================================
const CategoryPills = ({
  name,
  isSelected,
  onPress,
  isDark,
  selectedColor,
  tokens,
}: CategoryProp) => {
  const scaleAnim = useRef(new Animated.Value(isSelected ? 1.06 : 1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isSelected ? 1.06 : 1,
      useNativeDriver: true,
      friction: 7,
      tension: 120,
    }).start();
  }, [isSelected, scaleAnim]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View
          className="flex h-10 items-center justify-center rounded-full border px-3"
          style={{
            backgroundColor: isSelected ? `${selectedColor}70` : tokens.cardBgElevated,
            borderColor: isSelected ? selectedColor : tokens.border,
          }}>
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} text-md font-jetbrains-mono-light`}>
            {name}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

//====================================================SELECT-ICON-PILL==============================================
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

//=================================================MAIN-MODEL=========================================================
const AddHobbyModalContent = ({ onClose, isDark, tokens }: AddHobbyModalContentProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      category: 'Creative',
      color: '#ff7b00',
      icon: '🎨',
      minutesPerDay: 30,
    },
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
          setValue('color', color, { shouldValidate: true });
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
    setValue('category', name, { shouldValidate: true });
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
          setValue('icon', name, { shouldValidate: true });
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
      <View //============================================HEADER===================================================
        className={`${isDark ? 'border-b-border' : 'border-b-border-light'} w-full flex-row border border-x-0 border-t-0 p-4`}>
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
      <ScrollView //=======================================SCROLLABLE-SECTION=======================================
      >
        <View className="p-4">
          <Text
            className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} text-md mb-3 font-jetbrains-mono-bold`}>
            NAME
          </Text>
          <Controller //======================================NAME-OF-HOBBY=========================================
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
          <View
            className="mb-6 flex-row flex-wrap gap-2" //===============================CATEGORY-SELECTION-PILLS==============================
          >
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

          <Text
            className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} text-md mb-3 font-jetbrains-mono-bold`}>
            ICON
          </Text>
          <View
            className="mb-6 flex-row flex-wrap justify-between gap-2" //==========================ICON-SELECTION-MENU=======================
          >
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

          <Text
            className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} text-md mb-3 font-jetbrains-mono-bold`}>
            COLOR
          </Text>
          <View
            className="mb-6 flex-row" //=====================================COLOR-SELECTION-BALLS==========================================
          >
            {colors.map((color) => (
              <ColorBall
                key={color.name}
                name={color.name}
                isSelected={color.isSelected}
                onPress={() => handleColorBallPress(color.name)}
              />
            ))}
          </View>

          <Text
            className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} text-md mb-3 font-jetbrains-mono-bold`}>
            TIME PER DAY
          </Text>
          <View //==============================================TIME-SELECTION-SLIDER========================================================
            className={`${isDark ? 'border-border' : 'border-border-light'} rounded-2xl border p-4`}>
            <Controller
              control={control}
              name="minutesPerDay"
              render={({ field: { onChange, value } }) => {
                const minutesPerDay = typeof value === 'number' ? value : 30;

                return (
                  <View>
                    <View
                      className="mb-4 flex h-20 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${selectedColor}70`,
                        borderWidth: 1,
                        borderColor: selectedColor,
                      }}>
                      <Text
                        className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-4xl`}>
                        {formatMinutes(minutesPerDay)}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-3">
                      <Text
                        className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} w-10 font-jetbrains-mono-light text-sm`}>
                        15m
                      </Text>
                      <Slider
                        minimumValue={15}
                        maximumValue={360}
                        step={15}
                        value={minutesPerDay}
                        onValueChange={onChange}
                        minimumTrackTintColor={selectedColor}
                        maximumTrackTintColor={tokens.border}
                        thumbTintColor={selectedColor}
                        style={{ flex: 1 }}
                      />
                      <Text
                        className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} w-10 text-right font-jetbrains-mono-light text-sm`}>
                        6h
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          {errors.minutesPerDay && <Text>{errors.minutesPerDay.message}</Text>}
        </View>
      </ScrollView>
     ` <View //======================================================FOOTER=======================================================
        className={`${isDark ? 'border-border' : 'border-border-light'} flex-row gap-4 border border-x-0 border-b-0 p-4`}>
        <View
          className={`${isDark ? 'border-border bg-card-bg-elevated' : 'bg-card-bg-elevated-lightr border-border-light'} flex h-16 w-36 flex-row items-center justify-center rounded-2xl border`}>
          <Pressable onPress={onClose} className="active:opacity-70">
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
              Cancle
            </Text>
          </Pressable>
        </View>
        <View
          className="flex h-16 flex-1 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: `${selectedColor}70`,
            borderColor: selectedColor,
            borderWidth: 1,
          }}>
          <Pressable onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
              {isSubmitting ? 'Saving...' : 'Save Hobby'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AddHobbyModalContent;
