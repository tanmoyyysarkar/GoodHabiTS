import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SessionProgressRing } from './SessionProgressRing';
import { LogSessionMenuFooter } from './LogSessionMenuFooter';
import { MoodPill } from './MoodPill';
import { HobbyDetail, Mood, Time } from '../../../../types/logSessionModalTypes';
import DoneForToday from './logSessionMenuParts/DoneForToday';
import TimeInputMenu from './logSessionMenuParts/TimeInputMenu';

export const LogSessionMenu = ({
  name,
  icon,
  streakCount,
  color,
  minutesPerDay,
  isDark,
  tertiaryTextColor,
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

  const [renderedColor, setRenderedColor] = useState<string>(tertiaryTextColor);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const [doneForToday, setDoneForToday] = useState<boolean>(false);

  const onMoodPillPress = (nextColor: string, mood: Mood) => {
    setRenderedColor(nextColor);
    setSelectedMood(mood);
  };

  const [timeLogged, setTimeLogged] = useState<Time>({
    hours: 0,
    minutes: 0,
  });

  const [totalMinutesLogged, setTotalMinutesLogged] = useState(0);

  const incHour = () => {
    setTimeLogged((prev) => {
      return { hours: prev.hours < 24 ? prev.hours + 1 : 0, minutes: prev.minutes };
    });
  };

  const decHour = () => {
    setTimeLogged((prev) => {
      return { hours: prev.hours < 1 ? 24 : prev.hours - 1, minutes: prev.minutes };
    });
  };

  const incMin = () => {
    setTimeLogged((prev) => {
      return { hours: prev.hours, minutes: prev.minutes > 50 ? 0 : prev.minutes + 5 };
    });
  };

  const decMin = () => {
    setTimeLogged((prev) => {
      return { hours: prev.hours, minutes: prev.minutes < 5 ? 55 : prev.minutes - 5 };
    });
  };

  const normalizeTime = (time: Time) => {
    return time.hours * 60 + time.minutes;
  };

  useEffect(() => {
    setTotalMinutesLogged(normalizeTime(timeLogged));
  }, [timeLogged]);

  const doneForTodayPressed = () => {
    setDoneForToday(!doneForToday);
    setTimeLogged({
      hours: Math.floor(minutesPerDay / 60),
      minutes: minutesPerDay % 60,
    });
  };

  const handleLogSessionPress = () => {
    const data = {
      name: name,
      totalMinutesLogged: totalMinutesLogged,
      feeling: selectedMood?.name,
    };
    console.log(data);
  };

  return (
    <View className="px-3">
      <DoneForToday //===============================DONE-FOR-TODAY-BUTTON=================================
        color={color}
        doneForToday={doneForToday}
        isDark={isDark}
        minutesPerDay={minutesPerDay}
        onPress={doneForTodayPressed}
        selectedMood={selectedMood}
        tokens={tokens}
      />

      <View className="mx-7 mt-3 flex-row items-center justify-between p-3">
        <SessionProgressRing //==========================SESSION-PROGRESS-RING==============================
          isDark={isDark}
          mainColor={selectedMood ? selectedMood.color : color}
          progress={
            (totalMinutesLogged / minutesPerDay) * 100 <= 100
              ? (totalMinutesLogged / minutesPerDay) * 100
              : 100
          }
          size={100}
          strokeWidth={10}
          statusLabel="Help"
        />

        <TimeInputMenu //=======================TIME-INPUT-MENU-WITH-DISPLAY================================
          decHour={decHour}
          decMin={decMin}
          incHour={incHour}
          incMin={incMin}
          selectedMood={selectedMood}
          timeLogged={timeLogged}
          tokens={tokens}
        />
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

      <LogSessionMenuFooter //=======================FOOTER==================================
        isDark={isDark}
        renderedColor={renderedColor}
        selectedMoodName={selectedMood?.name}
        onCancel={onPress}
        onSubmit={handleLogSessionPress}
      />
    </View>
  );
};
