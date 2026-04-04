import { Text, View, TextInput, Pressable } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

interface AddHobbyModalContentProps {
  onClose: () => void;
  isDark: boolean;
}

//TODO: name, category, emoji/icon, color, time per day

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is requred'), //later move to misc if not provided
  minutesPerDay: z.coerce.number().int().positive('Must be > 0'),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

interface colorProp {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

const ColorBall = ({ name, isSelected, onPress }: colorProp) => {
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

const AddHobbyModalContent = ({ onClose, isDark }: AddHobbyModalContentProps) => {
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

  const handleColorBallPress = (color: string) => {
    setColors((prevColors) =>
      prevColors.map((prevColor) => ({
        name: prevColor.name,
        isSelected: prevColor.name === color ? true : false,
      }))
    );
  };

  return (
    <View className="flex h-full w-full">
      <View
        className={`${isDark ? 'border-b-border' : 'border-b-border-light'} w-full flex-row border border-x-0 border-t-0 p-3`}>
        <View
          className="h-16 w-16 items-center justify-center rounded-3xl"
          style={{ backgroundColor: colors.find((c) => c.isSelected)?.name ?? colors[0].name }}>
          <Text className="text-center text-3xl">🌿</Text>
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
              placeholder="Guitar"
              value={value}
              onChangeText={onChange}
              className={`${isDark ? 'border-border bg-card-bg-elevated text-text-primary' : 'border-border-light bg-card-bg-elevated-light text-text-primary-light'}
                 mb-6 h-16 w-full rounded-2xl border px-2 font-jetbrains-mono-bold text-xl`}
            />
          )}
        />

        {errors.name && <Text>{errors.name.message}</Text>}
        <View className="flex-row items-center justify-center">
          <Text
            className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} font-jetbrains-mono text-xl`}>
            Category:
          </Text>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <TextInput placeholder="Learnings" value={value} onChangeText={onChange} />
            )}
          />
        </View>
        {errors.category && <Text>{errors.category.message}</Text>}

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
