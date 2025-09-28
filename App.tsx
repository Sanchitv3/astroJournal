import AllJournalsScreen from './screens/allJournals';
import HomeScreen from './screens/homeScreen';
import JournalScreen from './screens/journalScreen';
import { AstroProvider } from './store/AstroContext';
import {
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabBarIcon from './components/TabBarIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AstroProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <StatusBar backgroundColor="#4C1D95" barStyle="light-content" />
          <SafeAreaView style={{flex:1}}>
            <Tab.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#4C1D95',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                tabBarStyle: {
                  backgroundColor: 'white',
                  borderTopWidth: 1,
                  borderTopColor: '#E5E7EB',
                  height: 85,
                  paddingBottom: 20,
                  paddingTop: 8,
                },
                tabBarActiveTintColor: '#4C1D95',
                tabBarInactiveTintColor: '#6B7280',
                tabBarShowLabel: false,
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: 'Astro Journal',
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon name="home" focused={focused} />
                  ),
                }}
              />
              <Tab.Screen
                name="Journal"
                component={JournalScreen}
                options={{
                  title: 'Write Journal',
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon name="journal" focused={focused} />
                  ),
                }}
              />
              <Tab.Screen
                name="AllJournals"
                component={AllJournalsScreen}
                options={{
                  title: 'All Journals',
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon name="all-journals" focused={focused} />
                  ),
                }}
              />
            </Tab.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AstroProvider>
  );
}
