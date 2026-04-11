import { useEffect, useState } from 'react';
import { ScrollView, View, Modal, RefreshControl } from 'react-native';
import { useColorScheme } from 'nativewind';

import HomeHeader from '@/components/Home/HomeHeader';
import StreakBox from '@/components/Home/StreakBox';
import SummaryCard from '@/components/Home/SummaryCard';
import MyHobbyCard from '@/components/Home/MyHobbyCards';
import LogASessionButton from '@/components/Home/LogASessionButton';
import ProfileModalContent from '@/components/Home/modalContent/ProfileModalContent';
import AddHobbyModalContent from '@/components/Home/modalContent/AddHobbyModalContent';
import LogSessionModalContent from '@/components/Home/modalContent/LogSessionModalContent';

import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useAuth } from '@/context/AuthContext';
import { HobbySession } from '@/types/logSessionModalTypes';
import {
  CurrentDaySummaryData,
  fetchCurrentDaySessions,
} from '@/lib/supabase/home/fetchCurrentDaySessions';
import fetchUserHobbies from '@/lib/supabase/home/fetchUserHobbies';
import softDeleteHobby from '@/lib/supabase/home/softDeleteHobby';

type ModalType = 'profile' | 'addHobby' | 'logSession' | null;

export type FetchedHobbyRow = {
  id: string;
  name: string;
  icon: string;
  streak_score: number | null;
  color: string;
  target_minutes: number;
  category: string;
  days_of_week: string[];
};

export type HobbyCardData = {
  id: string;
  emoji: string;
  name: string;
  streakScore: number;
  color: string;
};

const isCurrentDaySummaryItemValid = (value: unknown): value is CurrentDaySummaryData => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.color === 'string' &&
    typeof candidate.target_minutes === 'number' &&
    typeof candidate.minutes_today === 'number' &&
    typeof candidate.sessions_today === 'number'
  );
};

const isCurrentDaySummaryDataArrayValid = (value: unknown): value is CurrentDaySummaryData[] => {
  return Array.isArray(value) && value.every(isCurrentDaySummaryItemValid);
};

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
    setAddHobbyMode('add');
  };

  const { session } = useAuth();

  //===============================FOR-HEADER===================================
  const fullName = session ? session.user.user_metadata.full_name : '';
  const firstName = fullName.split(' ')[0];
  const initials = fullName
    .split(' ')
    .map((word: string) => word[0])
    .join('');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning.' : hour < 18 ? 'Good afternoon.' : 'Good evening.';

  const [hobbyDataForCards, setHobbyDataForCards] = useState<HobbyCardData[]>([]);
  const [hobbyDataForLogSessionList, setHobbyDataForLogSessionList] = useState<HobbySession[]>([]);
  const [currentDaySummaryData, setCurrentDaySummaryData] = useState<CurrentDaySummaryData[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [fetchedHobbies, setFetchedHobbies] = useState<FetchedHobbyRow[]>([]);

  const loadHobbies = async () => {
    if (!session) {
      setHobbyDataForCards([]);
      return;
    }

    const user_id = session.user.id;
    const { success, data, errorMessage } = await fetchUserHobbies(user_id);

    if (!success) {
      console.log(errorMessage);
      return;
    }

    setFetchedHobbies(data ?? []);

    //==============================FOR-MY-HOBBY-CARDS=============================
    const mappedHobbiesForMyHobbyCards: HobbyCardData[] =
      (data as FetchedHobbyRow[] | undefined)?.map((hobby) => ({
        id: hobby.id,
        emoji: hobby.icon,
        name: hobby.name,
        streakScore: hobby.streak_score ?? 0,
        color: hobby.color,
      })) ?? [];

    setHobbyDataForCards(mappedHobbiesForMyHobbyCards);

    //==============================FOR-HOBBY-SESSION-LIST==========================
    const mappedHobbyDataForLogSessionList: HobbySession[] =
      (data as FetchedHobbyRow[] | undefined)?.map((hobby) => ({
        id: hobby.id,
        name: hobby.name,
        icon: hobby.icon,
        streakCount: hobby.streak_score ?? 0,
        color: hobby.color,
        minutesPerDay: hobby.target_minutes,
      })) ?? [];

    setHobbyDataForLogSessionList(mappedHobbyDataForLogSessionList);
  };

  const loadCurrentDaySummaryData = async () => {
    const { success, data, errorMessage } = await fetchCurrentDaySessions();
    if (!success) {
      console.log(errorMessage);
      return;
    }

    if (isCurrentDaySummaryDataArrayValid(data)) {
      setCurrentDaySummaryData(data);
      return;
    }

    console.log('Unexpected current day summary data shape received from Supabase.');
  };

  const onRefresh = async () => {
    if (!session) return;
    setRefreshing(true);
    await Promise.all([loadHobbies(), loadCurrentDaySummaryData()]);
    setRefreshing(false);
  };

  useEffect(() => {
    void loadHobbies();
    void loadCurrentDaySummaryData();
  }, [session]);

  const [addHobbyMode, setAddHobbyMode] = useState<'add' | 'edit'>('add');
  const [selectedHobbyForEdit, setSelectedHobbyForEdit] = useState<FetchedHobbyRow | undefined>(
    undefined
  );

  const handleHobbyCardLongPress = (id: string) => {
    const selectedHobby = fetchedHobbies.find((x) => x.id === id);
    if (!selectedHobby) return;

    openModal('addHobby');
    setAddHobbyMode('edit');
    setSelectedHobbyForEdit(selectedHobby);
  };

  const handleHobbyDelete = async () => {
    if (!selectedHobbyForEdit) return;
    const { success, data, errorMessage } = await softDeleteHobby(selectedHobbyForEdit.id);
    if (!success) {
      console.log(errorMessage);
      return;
    }
    closeModal();
    setSelectedHobbyForEdit(undefined);
    setAddHobbyMode('add');
    setActiveModal(null);
    void loadHobbies();
    void loadCurrentDaySummaryData();
  };

  return (
    <>
      <View className="flex-1 pt-6" style={{ backgroundColor: tokens.pageBg }}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-8 px-6"
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <HomeHeader
            name={firstName}
            avatar={initials}
            greeting={greeting}
            isDark={isDark}
            tokens={tokens}
            onProfilePress={() => openModal('profile')}
          />
          <StreakBox isDark={isDark} tokens={tokens} />
          <SummaryCard isDark={isDark} tokens={tokens} summaryData={currentDaySummaryData} />
          {hobbyDataForCards.length > 0 ? (
            <LogASessionButton isDark={isDark} onPress={() => openModal('logSession')} />
          ) : null}
          <MyHobbyCard
            hobbyData={hobbyDataForCards}
            isDark={isDark}
            tokens={tokens}
            onAddPress={() => openModal('addHobby')}
            onLongPress={handleHobbyCardLongPress}
          />
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
            className={`h-[92%] w-[100%] rounded-t-3xl ${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} border`}>
            {activeModal === 'profile' && (
              <ProfileModalContent isDark={isDark} onClose={closeModal} />
            )}
            {activeModal === 'addHobby' && (
              <AddHobbyModalContent
                onDeletePress={handleHobbyDelete}
                mode={addHobbyMode}
                tokens={tokens}
                isDark={isDark}
                onClose={closeModal}
                onSubmitPress={() => {
                  void loadHobbies();
                  closeModal();
                }}
                selectedHobby={selectedHobbyForEdit}
              />
            )}
            {activeModal === 'logSession' && (
              <LogSessionModalContent
                hobbyList={hobbyDataForLogSessionList}
                tokens={tokens}
                isDark={isDark}
                onClose={closeModal}
                onSelectedHobbyViewChange={setIsLogSessionCompact}
                onLoggingASession={() => {
                  loadCurrentDaySummaryData();
                  closeModal();
                }}
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;
