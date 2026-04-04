import { ScrollView, View, Modal } from 'react-native';
import { useState } from 'react';
import { useColorScheme } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeTokens } from '@/hooks/useThemeTokens';

import HomeHeader from '@/components/Home/HomeHeader';
import StreakBox from '@/components/Home/StreakBox';
import SummaryCard from '@/components/Home/SummaryCard';
import MyHobbyCard from '@/components/Home/MyHobbyCards';
import LogASessionButton from '@/components/Home/LogASessionButton';

import ProfileModalContent from '@/components/Home/modalContent/ProfileModalContent';
import AddHobbyModalContent from '@/components/Home/modalContent/AddHobbyModalContent';
import LogSessionModalContent from '@/components/Home/modalContent/LogSessionModalContent';

type ModalType = 'profile' | 'addHobby' | 'logSession' | null;

const HomeScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: Exclude<ModalType, null>) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <LinearGradient
        colors={tokens.pageBg as unknown as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 pt-6">
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-8 px-6"
          showsVerticalScrollIndicator={false}>
          <HomeHeader isDark={isDark} tokens={tokens} onProfilePress={() => openModal('profile')} />
          <StreakBox isDark={isDark} tokens={tokens} />
          <SummaryCard isDark={isDark} tokens={tokens} />
          <MyHobbyCard isDark={isDark} tokens={tokens} onAddPress={() => openModal('addHobby')} />
          <LogASessionButton isDark={isDark} onPress={() => openModal('logSession')} />
          <View className="h-24 w-max"></View>
        </ScrollView>
      </LinearGradient>

      <Modal transparent visible={activeModal !== null} onRequestClose={closeModal} animationType='slide'>
        <View className="flex-1 items-center justify-center bg-card-bg">
          {activeModal === 'profile' && <ProfileModalContent onClose={closeModal} />}
          {activeModal === 'addHobby' && <AddHobbyModalContent onClose={closeModal} />}
          {activeModal === 'logSession' && <LogSessionModalContent onClose={closeModal} />}
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;
