import AllJournalsScreen from './screens/allJournals';
import HomeScreen from './screens/homeScreen';
import JournalScreen from './screens/journalScreen';
import { AstroProvider } from './store/AstroContext';
import {
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <AstroProvider>
        <NavigationIndependentTree>
          <NavigationContainer>
            <StatusBar />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#4C1D95',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Astro Journal' }}
              />
              <Stack.Screen
                name="Journal"
                component={JournalScreen}
                options={{ title: 'My Journal' }}
              />
              <Stack.Screen
                name="all-journals"
                component={AllJournalsScreen}
                options={{ title: 'All Journals' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NavigationIndependentTree>
      </AstroProvider>
    </GestureHandlerRootView>
  );
}
