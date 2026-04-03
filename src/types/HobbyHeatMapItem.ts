export type HobbyHeatmapItem = {
  name: string;
  color: string;
  category: string;
  emoji: string;
  totalHours: number;
  streakCount: number;
  totalTimePerDay: number;
  timeDoneToday: number;
  timeDonePerDay: number[];
  startDay: number; //sun = 1 -> sat = 7
};
