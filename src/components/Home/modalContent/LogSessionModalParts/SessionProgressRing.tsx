import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface SessionProgressRingProps {
  progress: number;
  size: number;
  strokeWidth: number;
  mainColor: string; // The primary color from your HobbyData
  isDark: boolean;
  statusLabel: string;
}

export const SessionProgressRing = ({
  progress,
  size,
  strokeWidth,
  mainColor,
  isDark,
  statusLabel,
}: SessionProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
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
          stroke={mainColor}
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
          {statusLabel}
        </Text>
      </View>
    </View>
  );
};
