import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface SessionProgressRingProps {
  progress: number;
  size: number;
  strokeWidth: number;
  mainColor: string; // The primary color from your HobbyData
  isDark: boolean;
  text: string;
}

export const SessionProgressRing = ({
  progress,
  size,
  strokeWidth,
  mainColor,
  isDark,
  text,
}: SessionProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            {/* Start color: A lighter or more vibrant version */}
            <Stop offset="0%" stopColor={mainColor} stopOpacity="1" />
            {/* End color: A slightly darker/different hue for the gradient effect */}
            <Stop offset="100%" stopColor={isDark ? '#fff' : '#363636'} stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Background Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isDark ? '#27272a' : '#e4e4e7'}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress Stroke with Gradient */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)" // Link to the ID in <Defs>
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>

      <View style={{ position: 'absolute' }}>
        <Text
          className={`${isDark ? 'text-white' : 'text-black'} font-jetbrains-mono-bold text-[10px]`}>
          {text}
        </Text>
      </View>
    </View>
  );
};
