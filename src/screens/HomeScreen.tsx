import StreakBox from '@/components/Home/StreakBox';
import HomeHeader from '@/components/Home/HomeHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { ScrollView, Text, View, Modal, Pressable } from 'react-native';
import SummaryCard from '@/components/Home/SummaryCard';
import MyHobbyCard from '@/components/Home/MyHobbyCards';
import LogASessionButton from '@/components/Home/LogASessionButton';
import { useState } from 'react';

const HomeScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const showModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  return (
    <>
      <LinearGradient
        colors={tokens.pageBg as unknown as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 pt-8">
        <ScrollView className="flex-1" contentContainerClassName="gap-8 px-6">
          <HomeHeader isDark={isDark} tokens={tokens} onProfilePress={() => showModal('You pressed the profile logo!')} />
          <StreakBox isDark={isDark} tokens={tokens} />
          <SummaryCard isDark={isDark} tokens={tokens} />
          <MyHobbyCard isDark={isDark} tokens={tokens} onAddPress={() => showModal('You pressed the +Add button!')} />
          <LogASessionButton isDark={isDark} onPress={() => showModal('You pressed Log a session!')} />
          <View className='h-24 w-max'></View>
        </ScrollView>
      </LinearGradient>

      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className={`${isDark ? 'bg-card-bg' : 'bg-card-bg-light'} rounded-2xl p-6 w-4/5`}>
            <Text className={`text-lg font-semibold mb-4 ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
              {modalMessage}
            </Text>
            <Pressable
              onPress={() => setModalVisible(false)}
              className="bg-purple-600 rounded-lg py-2 px-4">
              <Text className="text-white font-semibold text-center">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;
