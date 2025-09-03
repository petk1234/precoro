import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LogoExtended } from "../../assets";
import { COLORS } from "../theme/colors";

export const LoadingScreen = () => {
  return (
    <LinearGradient
      colors={[COLORS.main.bg.gradient1, COLORS.main.bg.gradient2]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.logo}>
        <LogoExtended />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
