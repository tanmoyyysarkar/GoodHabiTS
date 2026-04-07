import { ScrollView, View, Modal, Pressable, Text } from 'react-native';
import { useState } from 'react';
import { useColorScheme } from 'nativewind';
import { useThemeTokens } from '@/hooks/useThemeTokens';

import HomeHeader from '@/components/Home/HomeHeader';
import StreakBox from '@/components/Home/StreakBox';
import SummaryCard from '@/components/Home/SummaryCard';
import MyHobbyCard from '@/components/Home/MyHobbyCards';
import LogASessionButton from '@/components/Home/LogASessionButton';

import ProfileModalContent from '@/components/Home/modalContent/ProfileModalContent';
import AddHobbyModalContent from '@/components/Home/modalContent/AddHobbyModalContent';
import LogSessionModalContent from '@/components/Home/modalContent/LogSessionModalContent';

import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

type ModalType = 'profile' | 'addHobby' | 'logSession' | null;

const HomeScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isLogSessionCompact, setIsLogSessionCompact] = useState(false);

  const openModal = (type: Exclude<ModalType, null>) => setActiveModal(type);
  const closeModal = () => {
    setActiveModal(null);
    setIsLogSessionCompact(false);
  };

  const router = useRouter();

  const { logout } = useAuth();

  const modalHeightClass =
    activeModal === 'logSession' && isLogSessionCompact ? 'h-[80%]' : 'h-[90%]';

  return (
    <>
      <View className="flex-1 pt-6" style={{ backgroundColor: tokens.pageBg }}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-6 px-6"
          showsVerticalScrollIndicator={false}>
          <HomeHeader isDark={isDark} tokens={tokens} onProfilePress={() => openModal('profile')} />
          <StreakBox isDark={isDark} tokens={tokens} />
          <SummaryCard isDark={isDark} tokens={tokens} />
          <MyHobbyCard isDark={isDark} tokens={tokens} onAddPress={() => openModal('addHobby')} />
          <LogASessionButton isDark={isDark} onPress={() => openModal('logSession')} />
          <Pressable className="bg-red-700" onPress={() => router.push('/auth/login')}>
            <Text className="text-xl font-bold text-white">GO TO LOGIN PAGE</Text>
          </Pressable>
          <Pressable className="bg-red-700" onPress={logout}>
            <Text className="text-xl font-bold text-white">LOGOUT</Text>
          </Pressable>
          <View className="h-24 w-max"></View>
        </ScrollView>
      </View>

      <Modal
        transparent
        visible={activeModal !== null}
        onRequestClose={closeModal}
        animationType="slide">
        <View className="flex-1 items-center justify-end bg-black/35">
          <View
            className={`${modalHeightClass} w-[100%] rounded-t-3xl ${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} border`}>
            {activeModal === 'profile' && (
              <ProfileModalContent isDark={isDark} onClose={closeModal} />
            )}
            {activeModal === 'addHobby' && (
              <AddHobbyModalContent tokens={tokens} isDark={isDark} onClose={closeModal} />
            )}
            {activeModal === 'logSession' && (
              <LogSessionModalContent
                tokens={tokens}
                isDark={isDark}
                onClose={closeModal}
                onSelectedHobbyViewChange={setIsLogSessionCompact}
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;
