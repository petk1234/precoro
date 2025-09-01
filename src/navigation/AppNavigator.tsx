import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import { LoginScreen } from "../screens/LoginScreen";
import * as SplashScreen from "expo-splash-screen";
import DocumentsTabNavigator from "./TabsNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={token ? "Main" : "Login"}
    >
      {token ? (
        <Stack.Screen name='Main' component={DocumentsTabNavigator} />
      ) : (
        <Stack.Screen name='Login' component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
