import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export default StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {
    fontSize: 14,
    color: COLORS.main.primary[900],
    marginBottom: 8,
    fontWeight: "600",
  },
  required: { color: COLORS.main.red[900] },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputFilled: {
    backgroundColor: "#fff",
    color: COLORS.main.primary[900],
  },
  opened: {
    borderColor: "#3D5AFE",
  },
  placeholder: { color: "#9CA3AF", fontSize: 16 },
  value: { color: "#111827" },
  icon: { fontSize: 18, color: "#6B7280" },
});
