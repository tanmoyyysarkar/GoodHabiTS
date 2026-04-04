import { Text, View } from 'react-native';

interface LogSessionModalContentProps {
  onClose: () => void;
}

const LogSessionModalContent = ({onClose}: LogSessionModalContentProps) => {
  return (
    <View>
      <Text>Log Session Modal Content</Text>
    </View>
  );
};

export default LogSessionModalContent;
