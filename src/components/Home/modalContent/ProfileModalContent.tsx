import { Text, View } from 'react-native';

interface ProfileModalContentProps {
  onClose: () => void;
}

const ProfileModalContent = ({onClose}: ProfileModalContentProps) => {
  return (
    <View>
      <Text>Profile Modal Content</Text>
    </View>
  );
};

export default ProfileModalContent;
