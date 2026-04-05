import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native';

interface LogSessionModalContentProps {
  onClose: () => void;
  isDark: boolean;
  tokens: ThemeTokens;
}

interface HeaderProps {
  isDark: boolean;
  tokens: ThemeTokens;
  onClose: () => void;
}

interface HobbyItem {
  name: string;
  icon: string;
  streakCount: number;
  color: string;
  minutesPerDay: number;
}

interface HobbyDetail extends HobbyItem {
  isDark: boolean;
  baseColor: string;
  onPress: () => void;
}

//============================HOBBY-LIST-HEADER===============================
const HobbyListHeader = ({ isDark, tokens, onClose }: HeaderProps) => {
  return (
    <View
      className={`${isDark ? 'border-border' : 'border-border-light'} flex-row items-center justify-between border border-x-0 border-t-0 p-4`}>
      <View className="flex-col justify-between">
        <Text
          className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} font-jetbrains-mono text-sm`}>
          SELECT HOBBY
        </Text>
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-3xl`}>
          Which one today?
        </Text>
      </View>
      <Pressable className="mx-4 active:opacity-70" onPress={onClose}>
        <View
          className={`${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} flex h-8 w-8 items-center justify-center rounded-full border`}>
          <Ionicons name="close-outline" size={24} color={tokens.textPrimary} />
        </View>
      </Pressable>
    </View>
  );
};

//============================HOBBY-LIST===============================
const HobbyListItem = ({
  name,
  icon,
  streakCount,
  color,
  minutesPerDay,
  isDark,
  baseColor,
  onPress,
}: HobbyDetail) => {
  return (
    <Pressable onPress={onPress}>
      <View className="mx-3 flex-row items-center justify-between gap-2">
        <View className="flex-row gap-3">
          <View
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `${color}70`,
              borderColor: color,
              borderWidth: 2,
            }}>
            <Text className="text-3xl">{icon}</Text>
          </View>
          <View className="flex gap-1">
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono text-lg`}>
              {name}
            </Text>
            <View className="flex-row items-center gap-1">
              <View style={{ backgroundColor: `${color}60` }} className="rounded-full p-1">
                <Text className="font-jetbrains-mono text-xs" style={{ color: color }}>
                  🎯 {minutesPerDay}m/day
                </Text>
              </View>
              <Text className="font-jetbrains-mono text-xs" style={{ color: baseColor }}>
                🔥{streakCount}day streak
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Ionicons name="chevron-forward-outline" size={24} color={baseColor}></Ionicons>
        </View>
      </View>
    </Pressable>
  );
};

//=======================ADD-SESSION-MENU-HEADER=======================

const AddSessionMenuHeader = ({ isDark, tokens, onClose }: HeaderProps) => {
  return (
    <View
      className={`${isDark ? 'border-border' : 'border-border-light'} flex-row items-center justify-between border border-x-0 border-t-0 p-4`}>
      <View className="flex-col justify-between">
        <Text
          className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} font-jetbrains-mono text-sm`}>
          LOG SESSION
        </Text>
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-3xl`}>
          Which one today?
        </Text>
      </View>
      <Pressable className="mx-4 active:opacity-70" onPress={onClose}>
        <View
          className={`${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} flex h-8 w-8 items-center justify-center rounded-full border`}>
          <Ionicons name="close-outline" size={24} color={tokens.textPrimary} />
        </View>
      </Pressable>
    </View>
  );
};

//=========================ADD-SESSION-MENU============================
const AddSessionMenu = ({
  name,
  icon,
  streakCount,
  color,
  minutesPerDay,
  isDark,
  baseColor,
  onPress,
}: HobbyDetail) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

const LogSessionModalContent = ({ onClose, isDark, tokens }: LogSessionModalContentProps) => {
  const hobbyDetailsList: HobbyItem[] = [
    {
      name: 'Morning Sketching',
      icon: '🎨',
      streakCount: 7,
      color: '#00a2ff',
      minutesPerDay: 30,
    },
    {
      name: 'Evening Jogging',
      icon: '🏃',
      streakCount: 4,
      color: '#ff6b00',
      minutesPerDay: 25,
    },
    {
      name: 'Reading Fiction',
      icon: '📚',
      streakCount: 11,
      color: '#7b61ff',
      minutesPerDay: 40,
    },
    {
      name: 'Guitar Practice',
      icon: '🎸',
      streakCount: 6,
      color: '#00b894',
      minutesPerDay: 35,
    },
    {
      name: 'Meditation',
      icon: '🧘',
      streakCount: 9,
      color: '#f39c12',
      minutesPerDay: 20,
    },
    {
      name: 'Language Learning',
      icon: '🗣️',
      streakCount: 5,
      color: '#e84393',
      minutesPerDay: 30,
    },
    {
      name: 'Cooking New Recipes',
      icon: '🍳',
      streakCount: 3,
      color: '#e67e22',
      minutesPerDay: 45,
    },
    {
      name: 'Cycling',
      icon: '🚴',
      streakCount: 8,
      color: '#16a085',
      minutesPerDay: 50,
    },
    {
      name: 'Photography Walks',
      icon: '📷',
      streakCount: 2,
      color: '#2980b9',
      minutesPerDay: 35,
    },
    {
      name: 'Coding Challenges',
      icon: '💻',
      streakCount: 12,
      color: '#548899',
      minutesPerDay: 60,
    },
    {
      name: 'Yoga Flow',
      icon: '🧎',
      streakCount: 10,
      color: '#27ae60',
      minutesPerDay: 25,
    },
    {
      name: 'Gardening',
      icon: '🌱',
      streakCount: 6,
      color: '#6ab04c',
      minutesPerDay: 30,
    },
    {
      name: 'Chess Practice',
      icon: '♟️',
      streakCount: 14,
      color: '#9da8b4',
      minutesPerDay: 20,
    },
    {
      name: 'Journaling',
      icon: '📝',
      streakCount: 9,
      color: '#d35400',
      minutesPerDay: 15,
    },
    {
      name: 'Swimming',
      icon: '🏊',
      streakCount: 4,
      color: '#1abc9c',
      minutesPerDay: 40,
    },
    {
      name: 'Piano Practice',
      icon: '🎹',
      streakCount: 13,
      color: '#8e44ad',
      minutesPerDay: 30,
    },
    {
      name: 'Podcast Learning',
      icon: '🎧',
      streakCount: 7,
      color: '#f1c40f',
      minutesPerDay: 35,
    },
    {
      name: 'Calligraphy',
      icon: '✒️',
      streakCount: 5,
      color: '#9b59b6',
      minutesPerDay: 20,
    },
    {
      name: 'Dance Practice',
      icon: '💃',
      streakCount: 6,
      color: '#ff7675',
      minutesPerDay: 30,
    },
    {
      name: 'Bird Watching',
      icon: '🦜',
      streakCount: 3,
      color: '#2ecc71',
      minutesPerDay: 25,
    },
  ];

  const [selectedHobby, setSelectedHobby] = useState<HobbyItem | null>(null);

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
            <AddSessionMenuHeader
              isDark={isDark}
              tokens={tokens}
              onClose={() => setSelectedHobby(null)}
            />
            <AddSessionMenu
              onPress={() => handleHobbyListItemPress(selectedHobby.name)}
              key={selectedHobby.name}
              name={selectedHobby.name}
              minutesPerDay={selectedHobby.minutesPerDay}
              streakCount={selectedHobby.streakCount}
              color={selectedHobby.color}
              icon={selectedHobby.icon}
              isDark={isDark}
              baseColor={tokens.textTertiary}
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
                baseColor={tokens.textTertiary}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LogSessionModalContent;
