import { ThemeTokens } from '@/theme/tokens';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import {
  LogSessionMenu,
  LogSessionMenuHeader,
  HobbyListHeader,
  HobbyListItem,
} from './LogSessionModalParts/index';
import { HobbySession } from '@/types/logSessionModalTypes';

interface LogSessionModalContentProps {
  onClose: () => void;
  isDark: boolean;
  tokens: ThemeTokens;
  onSelectedHobbyViewChange: (isSelectedHobbyView: boolean) => void;
  hobbyList: HobbySession[];
}

const LogSessionModalContent = ({
  onClose,
  isDark,
  tokens,
  onSelectedHobbyViewChange,
  hobbyList,
}: LogSessionModalContentProps) => {
  const [selectedHobbySession, setSelectedHobbySession] = useState<HobbySession | null>(null);

  useEffect(() => {
    onSelectedHobbyViewChange(selectedHobbySession !== null);
  }, [selectedHobbySession, onSelectedHobbyViewChange]);

  const handleHobbyListItemPress = (hobbyName: string) => {
    const matchedHobbySession = hobbyList.find((hobby) => hobby.name === hobbyName) ?? null;
    console.log(matchedHobbySession);
    setSelectedHobbySession(matchedHobbySession);
  };

  return (
    <View className="flex h-full w-full">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {selectedHobbySession ? (
          <View className="gap-8 p-3">
            <LogSessionMenuHeader
              isDark={isDark}
              tokens={tokens}
              onClose={() => setSelectedHobbySession(null)}
              hobby={selectedHobbySession}
            />
            <LogSessionMenu
              key={selectedHobbySession.name}
              id={selectedHobbySession.id}
              onBackToList={() => setSelectedHobbySession(null)}
              name={selectedHobbySession.name}
              minutesPerDay={selectedHobbySession.minutesPerDay}
              streakCount={selectedHobbySession.streakCount}
              color={selectedHobbySession.color}
              icon={selectedHobbySession.icon}
              isDark={isDark}
              tertiaryTextColor={tokens.textTertiary}
              tokens={tokens}
            />
          </View>
        ) : (
          <View className="gap-8 p-3">
            <HobbyListHeader isDark={isDark} tokens={tokens} onClose={onClose} />
            {hobbyList.map((hobbySession) => (
              <HobbyListItem
                key={hobbySession.id}
                id={hobbySession.id}
                onPress={() => handleHobbyListItemPress(hobbySession.name)}
                name={hobbySession.name}
                minutesPerDay={hobbySession.minutesPerDay}
                streakCount={hobbySession.streakCount}
                color={hobbySession.color}
                icon={hobbySession.icon}
                isDark={isDark}
                tertiaryTextColor={tokens.textTertiary}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LogSessionModalContent;
