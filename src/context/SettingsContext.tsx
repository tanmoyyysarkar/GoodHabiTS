import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';

type ColorSchemeType = 'system' | 'light' | 'dark';

interface SettingsContextType {
  colorSchemePreference: ColorSchemeType;
  changeColorScheme: (colorScheme: ColorSchemeType) => void;
}

const THEME_PREFERENCE_KEY = 'settings:themePreference';

const SettingsContext = createContext<SettingsContextType>({
  colorSchemePreference: 'system',
  changeColorScheme: (colorScheme: ColorSchemeType) => {},
});

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const { setColorScheme } = useColorScheme();
  const [colorSchemePreference, setColorSchemePreference] = useState<ColorSchemeType>('system');

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
          setColorSchemePreference(savedTheme);
          setColorScheme(savedTheme);
          return;
        }
      } catch {
        // Fall back to system if storage is unavailable.
      }

      setColorSchemePreference('system');
      setColorScheme('system');
    };

    loadSavedTheme();
  }, [setColorScheme]);

  const changeColorScheme: SettingsContextType['changeColorScheme'] = (
    colorScheme: ColorSchemeType
  ) => {
    setColorSchemePreference(colorScheme);
    setColorScheme(colorScheme);
    AsyncStorage.setItem(THEME_PREFERENCE_KEY, colorScheme).catch(() => {
      // Ignore write failures to avoid blocking UI interaction.
    });
  };

  return (
    <SettingsContext.Provider value={{ colorSchemePreference, changeColorScheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
