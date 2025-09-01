import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 56,
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
  },
  leftItem: {
    width: "15%",
    height: "100%",
  },
  rightItem: {
    width: "15%",
    height: "100%",
  },
});
