import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SessionProgressRing } from './SessionProgressRing';
import { LogSessionMenuFooter } from './LogSessionMenuFooter';
import { MoodPill } from './MoodPill';
import { LogSessionMenuProps, Mood, SessionDuration } from '../../../../types/logSessionModalTypes';
import DoneForToday from './logSessionMenuParts/DoneForToday';
import TimeInputMenu from './logSessionMenuParts/TimeInputMenu';
import SessionNotes from './logSessionMenuParts/SessionNotes';

export const LogSessionMenu = ({
  name,
  color,
  minutesPerDay,
  isDark,
  tertiaryTextColor,
  onBackToList,
  tokens,
}: LogSessionMenuProps) => {
  const moodOptions: Mood[] = [
    { emoji: '😫', color: '#ff6565', name: 'Rough' },
    { emoji: '😕', color: '#ffb667', name: 'Meh' },
    { emoji: '🙂', color: '#fff643', name: 'Okay' },
    { emoji: '😁', color: '#a8ff50', name: 'Good' },
    { emoji: '🤩', color: '#73deff', name: 'Amazing' },
  ];

  const [accentColor, setAccentColor] = useState<string>(tertiaryTextColor);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [notes, setNotes] = useState('');

  const [isDoneForToday, setIsDoneForToday] = useState<boolean>(false);

  const handleMoodSelect = (nextColor: string, mood: Mood) => {
    setAccentColor(nextColor);
    setSelectedMood(mood);
  };

  const [timeLogged, setTimeLogged] = useState<SessionDuration>({
    hours: 0,
    minutes: 0,
  });

  const [totalMinutesLogged, setTotalMinutesLogged] = useState(0);

  const incrementHours = () => {
    setTimeLogged((prev) => {
      return { hours: prev.hours < 24 ? prev.hours + 1 : 0, minutes: prev.minutes };
    });
  };

  const decrementHours = () => {
    setTimeLogged((prev) => {
      return { hours: prev.hours < 1 ? 24 : prev.hours - 1, minutes: prev.minutes };
    });
  };

  const incrementMinutes = () => {
    setTimeLogged((prev) => {
      return { hours: prev.hours, minutes: prev.minutes > 50 ? 0 : prev.minutes + 5 };
    });
  };

  const decrementMinutes = () => {
    setTimeLogged((prev) => {
      return { hours: prev.hours, minutes: prev.minutes < 5 ? 55 : prev.minutes - 5 };
    });
  };

  const toTotalMinutes = (duration: SessionDuration) => {
    return duration.hours * 60 + duration.minutes;
  };

  useEffect(() => {
    setTotalMinutesLogged(toTotalMinutes(timeLogged));
  }, [timeLogged]);

  const handleDoneForTodayToggle = () => {
    setIsDoneForToday(!isDoneForToday);
    setTimeLogged({
      hours: Math.floor(minutesPerDay / 60),
      minutes: minutesPerDay % 60,
    });
  };

  const handleLogSessionPress = () => {
    const sessionLogPayload = {
      name,
      totalMinutesLogged,
      feeling: selectedMood?.name,
      notes: notes.trim() === '' ? '' : notes,
    };
    console.log(sessionLogPayload);
  };

  return (
    <View className="px-3">
      <DoneForToday //===============================DONE-FOR-TODAY-BUTTON=================================
        color={color}
        isDoneForToday={isDoneForToday}
        isDark={isDark}
        minutesPerDay={minutesPerDay}
        onToggle={handleDoneForTodayToggle}
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
          decrementHours={decrementHours}
          decrementMinutes={decrementMinutes}
          incrementHours={incrementHours}
          incrementMinutes={incrementMinutes}
          selectedMood={selectedMood}
          timeLogged={timeLogged}
          tokens={tokens}
        />
      </View>

      <Text className="py-3 font-jetbrains-mono text-sm" style={{ color: tokens.textTertiary }}>
        NOTES
      </Text>
      <SessionNotes
        color={color}
        notes={notes}
        onChangeText={setNotes}
        selectedMood={selectedMood}
        tokens={tokens}
      />

      <Text className="py-3 font-jetbrains-mono text-sm" style={{ color: tokens.textTertiary }}>
        HOW DID IT FEEL?
      </Text>
      <View className="flex-row items-center justify-between">
        {moodOptions.map((mood) => {
          return (
            <MoodPill
              key={mood.name}
              emoji={mood.emoji}
              color={mood.color}
              tokens={tokens}
              name={mood.name}
              onPress={() => handleMoodSelect(mood.color, mood)}
              isSelected={mood.name === selectedMood?.name}
            />
          );
        })}
      </View>

      <LogSessionMenuFooter //=======================FOOTER==================================
        isDark={isDark}
        accentColor={accentColor}
        selectedMoodName={selectedMood?.name}
        onCancel={onBackToList}
        onSubmit={handleLogSessionPress}
      />
    </View>
  );
};
