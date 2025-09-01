import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export default StyleSheet.create({
  container: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: COLORS.main.primary[400],
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
