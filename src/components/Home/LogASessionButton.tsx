import { View, Text, Pressable } from 'react-native';
const LogASessionButton = ({ isDark, onPress }: { isDark: boolean; onPress?: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`${isDark ? 'bg-button-primary' : 'bg-button-primary-light'} mx-10 flex h-16 items-center justify-center rounded-3xl active:opacity-70`}>
      <Text className={`${isDark ? "text-text-primary-light" : "text-text-primary"} text-xl font-bold`}>+ Log a session</Text>
    </Pressable>
  );
};

export default LogASessionButton;
