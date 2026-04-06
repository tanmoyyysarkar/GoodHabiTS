import { Text, View, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ThemeTokens } from '@/theme/tokens';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {
  addHobbySchema,
  AddHobbyFormInput,
  AddHobbyFormOutput,
} from '@/types/addHobbyModalTypes';
import {
  AddHobbyFooter,
  AddHobbyHeader,
  CategoryPills,
  ColorBall,
  formatMinutes,
  IconPills,
} from './AddHobbyModalParts/index';
import SubHeadingText from './AddHobbyModalParts/SubHeadingText';
import TimeSelectionSlider from './AddHobbyModalParts/TimeSelectionSlider';

interface AddHobbyModalContentProps {
  onClose: () => void;
  isDark: boolean;
  tokens: ThemeTokens;
}

//=================================================MAIN-MODEL=========================================================
const AddHobbyModalContent = ({ onClose, isDark, tokens }: AddHobbyModalContentProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddHobbyFormInput, unknown, AddHobbyFormOutput>({
    resolver: zodResolver(addHobbySchema),
    defaultValues: {
      name: '',
      category: 'Creative',
      color: '#ff7b00',
      icon: '🎨',
      minutesPerDay: 30,
    },
  });

  const onSubmit = async (data: AddHobbyFormOutput) => {
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
      <AddHobbyHeader
        isDark={isDark}
        selectedColor={selectedColor}
        selectedIcon={selectedIcon} //===============HEADER==================
      />

      <ScrollView //=======================================SCROLLABLE-SECTION=======================================
      >
        <View className="p-4">
          <SubHeadingText isDark={isDark} text="NAME" />
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

          <SubHeadingText isDark={isDark} text="CATEGORY" />
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

          <SubHeadingText isDark={isDark} text="ICON" />
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

          <SubHeadingText isDark={isDark} text="COLOR" />
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

          <SubHeadingText isDark={isDark} text="TIME PER DAY" />
          <TimeSelectionSlider //==============================================TIME-SELECTION-SLIDER========================================
            control={control}
            isDark={isDark}
            selectedColor={selectedColor}
            tokens={tokens}
          />
          {errors.minutesPerDay && <Text>{errors.minutesPerDay.message}</Text>}
        </View>
      </ScrollView>

      <AddHobbyFooter //=======================================FOOTER=================================
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
