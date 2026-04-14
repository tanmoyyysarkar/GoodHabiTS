import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/theme/tokens';

interface SearchBoxProps {
  isDark: boolean;
  tokens: ThemeTokens;
  searchText: string;
  onSearchTextChange: (value: string) => void;
}

const SearchBox = ({ isDark, tokens, searchText, onSearchTextChange }: SearchBoxProps) => {
  return (
    <View
      style={{ borderWidth: 0.5 }}
      className={`${isDark ? 'border-border bg-card-bg ' : 'border-border-light bg-card-bg-light '} h-12 w-full flex-row items-center rounded-2xl px-2`}>
      <Ionicons name="search-outline" size={24} color={tokens.textSecondary} />
      <TextInput
        placeholder="Search Hobbies..."
        placeholderTextColor={tokens.textSecondary}
        className={`h-full w-full px-4 ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light`}
        value={searchText}
        onChangeText={onSearchTextChange}
      />
    </View>
  );
};

export default SearchBox;
