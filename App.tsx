import "react-native-reanimated";
import "react-native-gesture-handler";
import "react-native-safe-area-context";
// import 'react-native-vector-icons';

import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./src/contexts/AuthContext";
import { FiltersProvider } from "./src/contexts/FiltersContext";
import { LoadingScreen } from "./src/screens/LoadingScreen";
// import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from "./src/utils/fonts";
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (e) {
        console.warn("Font loading error:", e);
        setFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthProvider>
          <FiltersProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <StatusBar style='auto' />
                <AppNavigator />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </FiltersProvider>
        </AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
