import { Text, View } from 'react-native';

interface ProfileModalContentProps {
  onClose: () => void;
  isDark: boolean;
}

const ProfileModalContent = ({onClose, isDark}: ProfileModalContentProps) => {
  return (
    <View>
      <Text>Profile Modal Content</Text>
    </View>
  );
};

export default ProfileModalContent;
