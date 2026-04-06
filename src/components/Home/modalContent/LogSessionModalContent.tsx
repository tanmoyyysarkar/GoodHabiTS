import { ThemeTokens } from '@/theme/tokens';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import {
  LogSessionMenu,
  LogSessionMenuHeader,
  HobbyItem,
  HobbyListHeader,
  HobbyListItem,
} from './logSessionModalParts/index';
import { hobbyDetailsList } from './LogSessionModalData';

interface LogSessionModalContentProps {
  onClose: () => void;
  isDark: boolean;
  tokens: ThemeTokens;
  onSelectedHobbyViewChange: (isSelectedHobbyView: boolean) => void;
}

const LogSessionModalContent = ({
  onClose,
  isDark,
  tokens,
  onSelectedHobbyViewChange,
}: LogSessionModalContentProps) => {
  const [selectedHobby, setSelectedHobby] = useState<HobbyItem | null>(null);

  useEffect(() => {
    onSelectedHobbyViewChange(selectedHobby !== null);
  }, [selectedHobby, onSelectedHobbyViewChange]);

  const handleHobbyListItemPress = (name: string) => {
    const foundHobby = hobbyDetailsList.find((hobby) => hobby.name === name) ?? null;
    console.log(foundHobby);
    setSelectedHobby(foundHobby);
  };

  return (
    <View className="flex h-full w-full">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {selectedHobby ? (
          <View className="gap-8 p-3">
            <LogSessionMenuHeader
              isDark={isDark}
              tokens={tokens}
              onClose={() => setSelectedHobby(null)}
              hobby={selectedHobby}
            />
            <LogSessionMenu
              onPress={() => setSelectedHobby(null)}
              key={selectedHobby.name}
              name={selectedHobby.name}
              minutesPerDay={selectedHobby.minutesPerDay}
              streakCount={selectedHobby.streakCount}
              color={selectedHobby.color}
              icon={selectedHobby.icon}
              isDark={isDark}
              tertiaryTextColor={tokens.textTertiary}
              tokens={tokens}
            />
          </View>
        ) : (
          <View className="gap-8 p-3">
            <HobbyListHeader isDark={isDark} tokens={tokens} onClose={onClose} />
            {hobbyDetailsList.map((hobbyDetails) => (
              <HobbyListItem
                onPress={() => handleHobbyListItemPress(hobbyDetails.name)}
                key={hobbyDetails.name}
                name={hobbyDetails.name}
                minutesPerDay={hobbyDetails.minutesPerDay}
                streakCount={hobbyDetails.streakCount}
                color={hobbyDetails.color}
                icon={hobbyDetails.icon}
                isDark={isDark}
                tertiaryTextColor={tokens.textTertiary}
                tokens={tokens}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LogSessionModalContent;
