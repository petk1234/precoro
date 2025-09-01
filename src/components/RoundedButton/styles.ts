import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export default StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: COLORS.buttons.primary,
  },
  disabled: {
    backgroundColor: COLORS.main.primary[400],
  },
  text: {
    color: "#FFF",
    fontWeight: 600,
  },
});
