import React from "react";
import { Dimensions, Platform, SafeAreaView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomSafeAreaProps {
  customStyles?: Object;
  children: React.ReactNode;
}

export const CustomSafeArea = ({
  customStyles,
  children,
}: CustomSafeAreaProps) => {
  const insets = useSafeAreaInsets();

  const specificInsetsStyles = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginBottom: insets.bottom + 10,
  };
  return (
    <SafeAreaView style={{ flex: 1, ...specificInsetsStyles, ...customStyles }}>
      {children}
    </SafeAreaView>
  );
};
