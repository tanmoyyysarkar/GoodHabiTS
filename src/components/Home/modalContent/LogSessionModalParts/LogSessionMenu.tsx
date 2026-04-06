import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SessionProgressRing } from './SessionProgressRing';
import { LogSessionMenuFooter } from './LogSessionMenuFooter';
import { MoodPill } from './MoodPill';
import { HobbyDetail, Mood, Time } from '../../../../types/logSessionModalTypes';

export const LogSessionMenu = ({
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

  const onMoodPillPress = (nextColor: string, mood: Mood) => {
    setRenderedColor(nextColor);
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
            <MoodPill
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

      <LogSessionMenuFooter
        isDark={isDark}
        renderedColor={renderedColor}
        selectedMoodName={selectedMood?.name}
        onCancel={onPress}
        onSubmit={handleLogSessionPress}
      />
    </View>
  );
};
