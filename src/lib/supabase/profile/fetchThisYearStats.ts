import { supabase } from '@/lib/supabase/supabase';

type Stats = {
  total_sessions: 84;
  avg_session_minutes: 38.4;
  most_active_day: 'Sunday';
  total_hours: 53.2;
};

export type YearInsightsDataType = {
  name: string;
  value: string;
}

export const fetchThisYearStats = async () => {
  try {
    const { data, error } = await supabase.rpc('get_my_profile_this_year_metrics');
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    const stats = data?.[0] as Stats;
    const yearInsightsData: YearInsightsDataType[] = [
      {
        name: 'Sessions logged',
        value: stats.total_sessions.toString(),
      },
      {
        name: 'Avg. session',
        value: `${Math.round(stats.avg_session_minutes)} min`,
      },
      {
        name: 'Most active day',
        value: stats.most_active_day || 'N/A',
      },
      {
        name: 'Total hours',
        value: `${Math.round(stats.total_hours)} hrs`,
      },
    ];

    return { success: true, data: yearInsightsData };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error fetching profile header stats';
    return { success: false as const, errorMessage };
  }
};
