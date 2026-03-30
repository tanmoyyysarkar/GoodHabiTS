import { View, Text } from 'react-native';
const LogASessionButton = ({ isDark }: { isDark: boolean }) => {
  return (
    <View
      className={`${!isDark ? 'bg-card-bg' : 'bg-card-bg-light'} mx-4 flex h-16 items-center justify-center rounded-3xl`}>
      <Text className='text-xl'>+ Log a session</Text>
    </View>
  );
};

export default LogASessionButton;
