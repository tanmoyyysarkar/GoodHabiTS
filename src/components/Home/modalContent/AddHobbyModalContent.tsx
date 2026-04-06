import { Text, View, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ThemeTokens } from '@/theme/tokens';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {
  AddHobbyFooter,
  AddHobbyHeader,
  CategoryPills,
  ColorBall,
  formatMinutes,
  IconPills,
} from './AddHobbyModalParts/index';

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
      <AddHobbyHeader isDark={isDark} selectedColor={selectedColor} selectedIcon={selectedIcon} />
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
      <AddHobbyFooter
        isDark={isDark}
        selectedColor={selectedColor}
        isSubmitting={isSubmitting}
        onClose={onClose}
        onSave={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default AddHobbyModalContent;
