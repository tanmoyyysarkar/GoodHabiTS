import { Text, View } from 'react-native';

interface ProfileModalContentProps {
  onClose: () => void;
  isDark: boolean;
}

//TODO complete it soon
const ProfileModalContent = ({onClose, isDark}: ProfileModalContentProps) => {
  return (
    <View>
      <Text>Profile Modal Content</Text>
    </View>
  );
};

export default ProfileModalContent;
