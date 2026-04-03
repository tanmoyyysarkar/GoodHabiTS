import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/theme/tokens';

interface SearchBoxProps {
  isDark: boolean;
  tokens: ThemeTokens;
}

const SearchBox = ({ isDark, tokens }: SearchBoxProps) => {
  return (
    <View
      className={`${isDark ? 'border-border bg-card-bg ' : 'border-border-light bg-card-bg-light '} h-12 w-full flex-row rounded-2xl border items-center px-2`}>
      <Ionicons name="search-outline" size={24} color={tokens.textSecondary}/>
      <TextInput
        placeholder="Search Hobbies..."
        placeholderTextColor={tokens.textSecondary}
        className={`h-full w-full px-4 ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light`}
      />
    </View>
  );
};

export default SearchBox;
