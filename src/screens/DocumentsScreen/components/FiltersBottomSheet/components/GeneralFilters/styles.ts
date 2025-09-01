import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../theme/colors";

export default StyleSheet.create({
  list: {
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderTopColor: COLORS.borders.neutral,
    borderTopWidth: 1,
  },
  rowOuter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: COLORS.borders.neutral,
    borderBottomWidth: 1,
    height: 48,
  },
  rowInternal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: COLORS.borders.neutral,
    borderBottomWidth: 1,
    height: 48,
    columnGap: 12,
  },
  redirect: {
    width: 24,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    fontWeight: 500,
  },
  submit: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
});
