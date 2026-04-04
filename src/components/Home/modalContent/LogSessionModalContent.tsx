import { Text, View } from 'react-native';

interface LogSessionModalContentProps {
  onClose: () => void;
  isDark: boolean;
}

const LogSessionModalContent = ({ onClose, isDark }: LogSessionModalContentProps) => {
  return (
    <View className="flex h-full w-full items-center justify-center">
      <Text>Log Session Modal Content</Text>
    </View>
  );
};

export default LogSessionModalContent;
