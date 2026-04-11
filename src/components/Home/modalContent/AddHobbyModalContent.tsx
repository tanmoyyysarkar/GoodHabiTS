import { Text, View, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { ThemeTokens } from '@/theme/tokens';
import { ScrollView } from 'react-native-gesture-handler';
import { addHobbySchema, AddHobbyFormInput, AddHobbyFormOutput } from '@/types/addHobbyModalTypes';
import {
  AddHobbyFooter,
  AddHobbyHeader,
  CategoryPills,
  ColorBall,
  IconPills,
} from './AddHobbyModalParts/index';
import SubHeadingText from './AddHobbyModalParts/SubHeadingText';
import TimeSelectionSlider from './AddHobbyModalParts/TimeSelectionSlider';
import addNewHobby from '@/lib/supabase/home/addNewHobby';
import { FetchedHobbyRow } from '@/screens/HomeScreen';
import editExistingHobby from '@/lib/supabase/home/editExistingHobby';

interface AddHobbyModalContentProps {
  onClose: () => void;
  onSubmitPress: () => void;
  isDark: boolean;
  tokens: ThemeTokens;
  mode: 'add' | 'edit';
  selectedHobby?: FetchedHobbyRow;
}

//=================================================MAIN-MODEL-STARTS-HERE===============================================
const AddHobbyModalContent = ({
  onClose,
  isDark,
  tokens,
  onSubmitPress,
  mode,
  selectedHobby,
}: AddHobbyModalContentProps) => {
  //========================================ZOD-FORM-SETUP==========================
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddHobbyFormInput, unknown, AddHobbyFormOutput>({
    resolver: zodResolver(addHobbySchema),
    defaultValues: {
      name: '',
      category: 'Misc',
      color: '#ff7b00',
      icon: '🎨',
      minutesPerDay: 30,
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
  });

  //=====================================FORM-CONSTANTS===============================
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

  const [categories, setCategories] = useState([
    { name: 'Creative', isSelected: true },
    { name: 'Sport', isSelected: false },
    { name: 'Music', isSelected: false },
    { name: 'Learning', isSelected: false },
    { name: 'Wellness', isSelected: false },
    { name: 'Social', isSelected: false },
    { name: 'Misc', isSelected: false },
  ]);

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

  const [days, setDays] = useState([
    { val: 'Sun', isSelected: true },
    { val: 'Mon', isSelected: true },
    { val: 'Tue', isSelected: true },
    { val: 'Wed', isSelected: true },
    { val: 'Thu', isSelected: true },
    { val: 'Fri', isSelected: true },
    { val: 'Sat', isSelected: true },
  ]);

  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedIcon, setSelectedIcon] = useState(icons[0].name);

  useEffect(() => {
    if (mode === 'edit' && selectedHobby) {
      const selectedDays =
        Array.isArray(selectedHobby.days_of_week) && selectedHobby.days_of_week.length > 0
          ? selectedHobby.days_of_week
          : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      setValue('name', selectedHobby.name);
      setValue('category', selectedHobby.category);
      setValue('icon', selectedHobby.icon);
      setValue('color', selectedHobby.color);
      setValue('days', selectedDays);
      setSelectedCategory(selectedHobby.category);
      setSelectedIcon(selectedHobby.icon);
      setSelectedColor(selectedHobby.color);
      setValue('minutesPerDay', selectedHobby.target_minutes);

      setCategories((prevCategories) =>
        prevCategories.map((prevCategory) => ({
          ...prevCategory,
          isSelected: prevCategory.name === selectedHobby.category,
        }))
      );

      setIcons((prevIcons) =>
        prevIcons.map((prevIcon) => ({
          ...prevIcon,
          isSelected: prevIcon.name === selectedHobby.icon,
        }))
      );

      setColors((prevColors) =>
        prevColors.map((prevColor) => ({
          ...prevColor,
          isSelected: prevColor.name === selectedHobby.color,
        }))
      );

      setDays((prevDays) =>
        prevDays.map((day) => ({
          ...day,
          isSelected: selectedDays.includes(day.val),
        }))
      );
    }
  }, [mode, selectedHobby, setValue]);

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

  const handleDayPillPress = (val: string) => {
    setDays((prevDays) => {
      const updatedDays = prevDays.map((day) => {
        if (day.val === val)
          return {
            ...day,
            isSelected: !day.isSelected,
          };
        return {
          ...day,
        };
      });

      const selectedDayVals = updatedDays.filter((day) => day.isSelected).map((day) => day.val);
      setValue('days', selectedDayVals, { shouldValidate: true, shouldDirty: true });

      return updatedDays;
    });
  };

  const onSubmit = async (formOutputData: AddHobbyFormOutput) => {
    if (mode === 'add') {
      const is_daily = formOutputData.days.length === 7;
      const { success, data, errorMessage } = await addNewHobby(
        formOutputData.name,
        formOutputData.icon,
        formOutputData.color,
        formOutputData.minutesPerDay,
        formOutputData.days,
        formOutputData.category,
        is_daily
      );
      if (!success) {
        console.log(errorMessage);
      }
    } else if (mode === 'edit' && selectedHobby) {
      const is_daily = formOutputData.days.length === 7;
      const { success, data, errorMessage } = await editExistingHobby(
        formOutputData.name,
        formOutputData.icon,
        formOutputData.color,
        formOutputData.minutesPerDay,
        formOutputData.days,
        formOutputData.category,
        is_daily,
        selectedHobby.id
      );
      if (!success) {
        console.log(errorMessage);
      }
    } else return;
    onSubmitPress();
  };

  return (
    <View className="flex h-full w-full">
      <AddHobbyHeader
        mode={mode}
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
                placeholder="eg. Learning Guitar"
                placeholderTextColor={tokens.textTertiary}
                value={value}
                onChangeText={onChange}
                className={`${isDark ? 'border-border bg-card-bg-elevated text-text-primary' : 'border-border-light bg-card-bg-elevated-light text-text-primary-light'}
                 mb-6 h-16 w-full rounded-2xl border px-4 font-jetbrains-mono text-xl`}
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
            onDayPillPress={handleDayPillPress}
            days={days}
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
