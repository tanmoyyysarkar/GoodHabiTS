import { TabBar } from '@/components/TabBar';
import { Redirect, withLayoutContext } from 'expo-router';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';

// Material Top Tabs uses react-native-pager-view under the hood, which enables
// interactive horizontal swipe gestures (drag/hold/release) between tab screens.
const { Navigator } = createMaterialTopTabNavigator();

// withLayoutContext keeps expo-router file-based routing while swapping the navigator
// implementation from static Tabs to a pager-backed tab navigator.
const SwipeTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const { session, loading } = useAuth();
  if (loading) return null;
  if (!session) return <Redirect href="/auth/login" />;

  return (
    <SwipeTabs
      // Keep the custom bar visually at the bottom even though we use top-tabs engine.
      tabBarPosition="bottom"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        // This is the key switch that enables horizontal swipe between tabs.
        swipeEnabled: true,
        // Keeps page transition animated when tapping a tab button.
        animationEnabled: true,
      }}>
      <SwipeTabs.Screen name="index" options={{ title: 'Home' }} />
      <SwipeTabs.Screen name="hobbies" options={{ title: 'Hobbies' }} />
      <SwipeTabs.Screen name="insights" options={{ title: 'Insights' }} />
      <SwipeTabs.Screen name="profile" options={{ title: 'Profile' }} />
    </SwipeTabs>
  );
}
