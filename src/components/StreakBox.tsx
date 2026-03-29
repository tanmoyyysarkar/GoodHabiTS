import { Text, View } from 'react-native';

const StreakBox = () => {
  return (
    <View
      className="m-6 flex-row items-center gap-4 rounded-2xl border-yellow-600 bg-yellow-950 p-3"
      style={{ borderWidth: 0.5 }}>
      <Text className="text-3xl">🔥</Text>
      <Text className="font-base flex-1 text-xl text-orange-200">
        12-day streak! Log a session today to keep it going.
      </Text>
    </View>
  );
};

export default StreakBox;
