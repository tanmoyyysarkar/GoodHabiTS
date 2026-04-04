import { Text, View } from 'react-native';

interface AddHobbyModalContentProps {
  onClose: () => void;
}

const AddHobbyModalContent = ({ onClose }: AddHobbyModalContentProps) => {
  return (
    <View>
      <Text>Add Hobby Modal Content</Text>
    </View>
  );
};

export default AddHobbyModalContent;
