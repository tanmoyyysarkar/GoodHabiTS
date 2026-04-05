import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import { SessionProgressRing } from './SessionProgressRing';

interface LogSessionModalContentProps {
  onClose: () => void;
  isDark: boolean;
  tokens: ThemeTokens;
  onSelectedHobbyViewChange: (isSelectedHobbyView: boolean) => void;
}

interface HeaderProps {
  isDark: boolean;
  tokens: ThemeTokens;
  onClose: () => void;
}

interface AddSessionHeaderProps extends HeaderProps {
  hobby: HobbyItem;
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
  tokens: ThemeTokens;
}

interface Mood {
  emoji: string;
  color: string;
  name: string;
}

interface MoodPillProp {
  emoji: string;
  color: string;
  name: string;
  tokens: ThemeTokens;
  onPress: () => void;
  isSelected: boolean;
}

interface Time {
  hours: number;
  minutes: number;
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
      <Pressable className="ml-4 active:opacity-70" onPress={onClose}>
        <View
          className={`${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} flex h-10 w-10 items-center justify-center rounded-full border`}>
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
              <Text className="ml-2 font-jetbrains-mono text-xs" style={{ color: baseColor }}>
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

const AddSessionMenuHeader = ({ isDark, tokens, onClose, hobby }: AddSessionHeaderProps) => {
  return (
    <View
      className={`${isDark ? 'border-border' : 'border-border-light'} flex-row items-center justify-between border border-x-0 border-t-0 p-4`}>
      <View className="flex-row justify-between">
        <View
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: `${hobby.color}70`,
            borderColor: hobby.color,
            borderWidth: 2,
          }}>
          <Text className="text-3xl">{hobby.icon}</Text>
        </View>
        <View className="flex justify-end px-3">
          <Text
            className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} font-jetbrains-mono text-xs`}>
            LOG SESSION
          </Text>
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xl`}>
            {hobby.name}
          </Text>
        </View>
      </View>
      <View className="flex-row items-start">
        <View className="flex h-6 items-center justify-center rounded-full border border-orange-600 bg-orange-600/60 px-2">
          <Text
            className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light text-sm`}>
            🔥{hobby.streakCount}d
          </Text>
        </View>
        <Pressable className="ml-4 active:opacity-70" onPress={onClose}>
          <View
            className={`${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} flex h-10 w-12 items-center justify-center rounded-full border`}>
            <Ionicons name="arrow-back-outline" size={24} color={tokens.textPrimary} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

//=================================================MOOD-PILLS=============================================
const MoodPills = ({ emoji, color, name, tokens, onPress, isSelected }: MoodPillProp) => {
  return (
    <Pressable onPress={onPress}>
      <View
        className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl"
        style={{
          backgroundColor: isSelected ? `${color}70` : tokens.cardBgElevated,
          borderColor: isSelected ? color : tokens.border,
          borderWidth: 1,
        }}>
        <Text className="text-3xl">{emoji}</Text>
        <Text
          className="font-jetbrains-mono-light text-xs "
          style={{ color: isSelected ? color : tokens.textSecondary }}>
          {name}
        </Text>
      </View>
    </Pressable>
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
  tokens,
}: HobbyDetail) => {
  const moods: Mood[] = [
    { emoji: '😫', color: '#ff6565', name: 'Rough' },
    { emoji: '😕', color: '#ffb667', name: 'Meh' },
    { emoji: '🙂', color: '#fff643', name: 'Okay' },
    { emoji: '😁', color: '#a8ff50', name: 'Good' },
    { emoji: '🤩', color: '#73deff', name: 'Amazing' },
  ];

  const [renderedColor, setRenderedColor] = useState<string>(baseColor);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const [doneForToday, setDoneForToday] = useState<boolean>(false);

  const onMoodPillPress = (color: string, mood: Mood) => {
    setRenderedColor(color);
    setSelectedMood(mood);
  };

  const [timeDone, setTimeDone] = useState<Time>({
    hours: 0,
    minutes: 0,
  });

  const [timeDoneToday, setTimeDoneToday] = useState(0);

  const incHour = () => {
    setTimeDone((prev) => {
      return { hours: prev.hours < 24 ? prev.hours + 1 : 0, minutes: prev.minutes };
    });
  };

  const decHour = () => {
    setTimeDone((prev) => {
      return { hours: prev.hours < 1 ? 24 : prev.hours - 1, minutes: prev.minutes };
    });
  };

  const incMin = () => {
    setTimeDone((prev) => {
      return { hours: prev.hours, minutes: prev.minutes > 50 ? 0 : prev.minutes + 5 };
    });
  };

  const decMin = () => {
    setTimeDone((prev) => {
      return { hours: prev.hours, minutes: prev.minutes < 5 ? 55 : prev.minutes - 5 };
    });
  };

  const normalizeTime = (time: Time) => {
    return time.hours * 60 + time.minutes;
  };

  useEffect(() => {
    setTimeDoneToday(normalizeTime(timeDone));
  }, [timeDone]);

  const doneForTodayPressed = () => {
    setDoneForToday(!doneForToday);
    setTimeDone({
      hours: Math.floor(minutesPerDay / 60),
      minutes: minutesPerDay % 60,
    });
  };

  const handleLogSessionPress = () => {
    const data = {
      name: name,
      timeDoneToday: timeDoneToday,
      feeling: selectedMood?.name,
    };
    console.log(data);
  };

  return (
    <View className="px-3">
      <View
        className=" h-20 w-full flex-row items-center justify-between rounded-2xl p-3"
        style={{
          backgroundColor: doneForToday
            ? selectedMood
              ? `${selectedMood.color}70`
              : `${color}70`
            : tokens.cardBgElevated,
          borderWidth: 1,
          borderColor: doneForToday ? (selectedMood ? selectedMood.color : color) : tokens.border,
        }}>
        <View>
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xl`}>
            Done For Today!
          </Text>
          <Text
            className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono text-sm`}>
            Mark {minutesPerDay}m - Your daily goal
          </Text>
        </View>
        <Pressable onPress={doneForTodayPressed} className="px-2">
          <Ionicons
            name={doneForToday ? 'checkmark-circle-outline' : 'ellipse-outline'}
            size={40}
            color={
              doneForToday ? (selectedMood ? selectedMood.color : color) : tokens.textSecondary
            }
          />
        </Pressable>
      </View>
      <View className="mx-7 mt-3 flex-row items-center justify-between p-3">
        <SessionProgressRing
          isDark={isDark}
          mainColor={selectedMood ? selectedMood.color : color}
          progress={
            (timeDoneToday / minutesPerDay) * 100 <= 100
              ? (timeDoneToday / minutesPerDay) * 100
              : 100
          }
          size={100}
          strokeWidth={10}
          text="Help"
        />
        <View className="flex-row items-center justify-center gap-2">
          <View className="flex items-center justify-center gap-2">
            <Pressable
              onPress={incHour}
              className="flex h-8 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.border,
                borderWidth: 1,
              }}>
              <Ionicons name="chevron-up-outline" size={24} color={tokens.textTertiary} />
            </Pressable>
            <View
              className="flex h-12 w-16 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: selectedMood ? selectedMood.color : tokens.border,
                borderWidth: 1,
              }}>
              <Text
                className="font-jetbrains-mono-bold text-2xl"
                style={{ color: tokens.textPrimary }}>
                {timeDone.hours}
              </Text>
            </View>
            <Pressable
              className="flex h-8 w-12 items-center justify-center rounded-xl"
              onPress={decHour}
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.border,
                borderWidth: 1,
              }}>
              <Ionicons name="chevron-down-outline" size={24} color={tokens.textTertiary} />
            </Pressable>
          </View>
          <Text
            className="font-jetbrains-mono-bold text-4xl"
            style={{ color: tokens.textTertiary }}>
            :
          </Text>
          <View className="flex items-center justify-center gap-2">
            <Pressable
              className="flex h-8 w-12 items-center justify-center rounded-xl"
              onPress={incMin}
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.border,
                borderWidth: 1,
              }}>
              <Ionicons name="chevron-up-outline" size={24} color={tokens.textTertiary} />
            </Pressable>
            <View
              className="flex h-12 w-16 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: selectedMood ? selectedMood.color : tokens.border,
                borderWidth: 1,
              }}>
              <Text
                className="font-jetbrains-mono-bold text-2xl"
                style={{ color: tokens.textPrimary }}>
                {timeDone.minutes}
              </Text>
            </View>
            <Pressable
              onPress={decMin}
              className="flex h-8 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.border,
                borderWidth: 1,
              }}>
              <Ionicons name="chevron-down-outline" size={24} color={tokens.textTertiary} />
            </Pressable>
          </View>
        </View>
      </View>
      <Text className="py-3 font-jetbrains-mono text-sm" style={{ color: tokens.textTertiary }}>
        HOW DID IT FEEL?
      </Text>
      <View className="flex-row items-center justify-between">
        {moods.map((mood) => {
          return (
            <MoodPills
              key={mood.name}
              emoji={mood.emoji}
              color={mood.color}
              tokens={tokens}
              name={mood.name}
              onPress={() => onMoodPillPress(mood.color, mood)}
              isSelected={mood.name === selectedMood?.name}
            />
          );
        })}
      </View>

      <View //======================================================FOOTER=======================================================
        className="flex-row gap-4 pt-4">
        <View
          className={`${isDark ? 'border-border bg-card-bg-elevated' : 'bg-card-bg-elevated-lightr border-border-light'} flex h-16 w-36 flex-row items-center justify-center rounded-2xl border`}>
          <Pressable className="active:opacity-70" onPress={onPress}>
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
              Cancle
            </Text>
          </Pressable>
        </View>
        <View
          className="flex h-16 flex-1 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: `${renderedColor}70`,
            borderColor: renderedColor,
            borderWidth: 1,
          }}>
          <Pressable disabled={selectedMood ? false : true} onPress={handleLogSessionPress}>
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
              Log Session →
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const LogSessionModalContent = ({
  onClose,
  isDark,
  tokens,
  onSelectedHobbyViewChange,
}: LogSessionModalContentProps) => {
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
            <AddSessionMenuHeader
              isDark={isDark}
              tokens={tokens}
              onClose={() => setSelectedHobby(null)}
              hobby={selectedHobby}
            />
            <AddSessionMenu
              onPress={() => setSelectedHobby(null)}
              key={selectedHobby.name}
              name={selectedHobby.name}
              minutesPerDay={selectedHobby.minutesPerDay}
              streakCount={selectedHobby.streakCount}
              color={selectedHobby.color}
              icon={selectedHobby.icon}
              isDark={isDark}
              baseColor={tokens.textTertiary}
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
                baseColor={tokens.textTertiary}
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
