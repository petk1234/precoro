import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

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
    color: COLORS.main.primary[900],
  },
  leftItem: {
    width: "15%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    padding: 10,
  },
  rightItem: {
    width: "15%",
    height: "100%",
  },
});
