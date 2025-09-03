import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme/colors";

export default StyleSheet.create({
  option: {
    borderRadius: 8,
    flex: 1,
    height: 40,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selected: {
    backgroundColor: COLORS.main.accent[200],
    color: COLORS.elements.active,
  },
  nestedOption: {
    borderRadius: 8,
    width: "100%",
    height: 40,
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
});
