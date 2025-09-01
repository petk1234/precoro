import { StyleSheet } from "react-native";
import { COLORS } from "../../../../theme/colors";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  statusChip: {
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: COLORS.main.primary[200],
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    height: 36,
  },
  selectedChip: {
    backgroundColor: COLORS.elements.active,
  },
  statusLabel: {
    color: COLORS.main.primary[900],
    fontSize: 14,
    fontWeight: "600",
  },
  selectedLabel: {
    color: "#fff",
  },
});
