import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import { RootNavigator } from './src/ui/navigation/RootNavigator';
import { LoadingSpinner } from './src/ui/components/LoadingSpinner';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const appState = useRef(AppState.currentState);

  // Handle app lifecycle states
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          // App has come to the foreground
          console.log('App has come to the foreground');
        } else if (nextAppState.match(/inactive|background/)) {
          // App has gone to the background
          console.log('App has gone to the background');
        }

        appState.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner message="Restoring data..." />} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

