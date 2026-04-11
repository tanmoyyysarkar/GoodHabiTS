import { MoodVsSessionDataType } from '@/lib/supabase/fetchMoodTrends';
import { ThemeTokens } from '@/theme/tokens';
import { useMemo} from 'react';
import { Text, View, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface MoodVsSessionGraphProps {
  isDark: boolean;
  tokens: ThemeTokens;
  data: MoodVsSessionDataType[];
}

type MoodPoint = {
  x: number;
  y: number;
};

/* -------------------------------------------------------------------------
  1. CONFIGURATION & CONSTANTS
  -------------------------------------------------------------------------
  Here we define the visual boundaries of our graph.
  We use the device's screen width to make sure the graph is responsive.
  The padding is crucial: it creates a "safe zone" inside the SVG canvas
  so that our dots don't get cut off at the edges, and it leaves room on
  the left specifically for our emojis.
*/
const MOOD_EMOJIS: Record<number, string> = {
  1: '😫',
  2: '😕',
  3: '🙂',
  4: '😁',
  5: '🤩',
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRAPH_WIDTH = SCREEN_WIDTH - 64;
const GRAPH_HEIGHT = 180;
const CHART_PADDING = {
  top: 20,
  right: 20,
  bottom: 35,
  left: 45,
} as const;

const MAX_MOOD = 5;
const MIN_MOOD = 1;

const MoodVsSessionGraph = ({ isDark, tokens, data }: MoodVsSessionGraphProps) => {
  /* -------------------------------------------------------------------------
    2. DATA FORMATTING
    -------------------------------------------------------------------------
    We take the raw database rows and format them into simple {x, y} coordinates.
    X represents the minutes logged.
    Y represents the mood (1 through 5).
    We use useMemo so we don't recalculate this array on every single render
    unless the database data actually changes.
  */
  const chartData = useMemo<MoodPoint[]>(() =>
    data
      .map((item) => ({ x: Number(item.minutes_logged), y: Number(item.feeling) }))
      .filter((item) => Number.isFinite(item.x) && item.y >= MIN_MOOD),
    [data]
  );

  /* -------------------------------------------------------------------------
    3. DYNAMIC X-AXIS BOUNDARIES
    -------------------------------------------------------------------------
    To make the graph look good, we need to know the longest session the user
    has ever had. If their longest session is 45 minutes, we round the edge
    of the graph up to 60 minutes. If they have no data, we default to 60.
  */
  const xDomainMax = useMemo(() => {
    const max = Math.max(...chartData.map((item) => item.x), 0);
    return max <= 0 ? 60 : Math.ceil(max / 30) * 30;
  }, [chartData]);

  /* -------------------------------------------------------------------------
    4. THE MATH: SCALING FUNCTIONS
    -------------------------------------------------------------------------
    SVG canvases are measured in exact pixels, but our data is measured in
    minutes (X) and moods (Y). These two functions act as translators.

    xScale: "Translate 30 minutes into an exact pixel position on the screen,
             making sure to account for the left padding."

    yScale: "Translate mood level 5 into a vertical pixel. Remember that in
             SVG, Y=0 is at the TOP of the screen, so we have to flip the math
             (MAX_MOOD - value) so that a high mood sits at the top."
  */
  const xScale = (value: number) => {
    const availableWidth = GRAPH_WIDTH - CHART_PADDING.left - CHART_PADDING.right;
    return CHART_PADDING.left + (value / xDomainMax) * availableWidth;
  };

  const yScale = (value: number) => {
    const availableHeight = GRAPH_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;
    return CHART_PADDING.top + ((MAX_MOOD - value) / (MAX_MOOD - MIN_MOOD)) * availableHeight;
  };

  // We define the labels we want to draw on the screen
  const yLabels = [5, 4, 3, 2, 1];
  const xLabels = [0, Math.round(xDomainMax / 2), xDomainMax];

  // Theming
  const accentColor = isDark ? '#00d0ff' : '#8563ff';
  const chartCardClass = `${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} rounded-3xl border p-4`;

  /* -------------------------------------------------------------------------
    5. THE UI RENDER
    -------------------------------------------------------------------------
  */
  return (
    <View className={chartCardClass}>
      {chartData.length > 0 ? (
        <View>
          <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
            {/* We map through our formatted data and draw a dot for each session.
              cx and cy are the "center x" and "center y" pixel coordinates.
            */}
            {chartData.map((point, i) => (
              <Circle
                key={`p-${i}`}
                cx={xScale(point.x)}
                cy={yScale(point.y)}
                r={6}
                fill={accentColor}
                stroke={isDark ? '#000' : '#fff'}
                strokeWidth={2}
              />
            ))}
          </Svg>

          {/* Y-AXIS EMOJIS
            We place these in a standard React Native View floating exactly
            over the left side of the SVG. This prevents the emojis from looking
            blurry or glitching on Android, which sometimes happens inside Svgs.
          */}
          <View className="absolute left-0 top-0 bottom-0 w-10 justify-between py-[20px]"
                style={{ height: GRAPH_HEIGHT, paddingTop: CHART_PADDING.top - 8, paddingBottom: CHART_PADDING.bottom - 8 }}>
            {yLabels.map((val) => (
              <Text key={`emoji-${val}`} className="text-center text-lg">
                {MOOD_EMOJIS[val]}
              </Text>
            ))}
          </View>

          {/* X-AXIS LABELS (Time)
            Placing these exactly under the graph, using margins to align them
            with the SVG padding boundaries.
          */}
          <View className="flex-row justify-between" style={{ marginLeft: CHART_PADDING.left, marginRight: CHART_PADDING.right }}>
            {xLabels.map((val) => (
              <Text key={`x-${val}`} style={{ color: tokens.textSecondary }} className="font-jetbrains-mono text-[10px]">
                {val}m
              </Text>
            ))}
          </View>
        </View>
      ) : (
        /* FALLBACK EMPTY STATE */
        <View className="h-40 items-center justify-center">
          <Text style={{ color: tokens.textSecondary }} className="text-center font-jetbrains-mono-light text-xs">
            Not enough data to map trends yet.
          </Text>
        </View>
      )}
    </View>
  );
};

export default MoodVsSessionGraph;
