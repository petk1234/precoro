import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export default StyleSheet.create({
  container: {
    display: "flex",
    rowGap: 4,
    paddingBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
  inputContainer: {
    display: "flex",
    position: "relative",
  },
  inputBase: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.borders.secondary,
    padding: 10,
    borderRadius: 12,
  },
  secureEye: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: "-50%" }],
  },
  errorInput: {
    borderColor: COLORS.main.danger,
  },
  errorText: {
    position: "absolute",
    left: 12,
    bottom: -16,
    color: COLORS.main.danger,
    fontSize: 12,
  },
});
