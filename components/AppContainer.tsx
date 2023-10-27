import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import theme from 'theme';
import {colors} from 'theme/themeConfig';
import {Toasts} from '@backpackapp-io/react-native-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {suspense: true},
  },
});

type AppContainerProps = {
  children: React.ReactNode;
};

export default function AppContainer({children}: AppContainerProps) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <SafeAreaView style={[styles.container, styles.safeArea]}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </SafeAreaView>
          </NavigationContainer>
        </ThemeProvider>
        <Toasts />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: colors.primary,
  },
});
