import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 14, color: "#24324B", marginBottom: 8, fontWeight: "600" },
  required: { color: "#B00020" },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputFilled: {
    backgroundColor: "#fff",
    borderColor: "#3D5AFE",
  },
  placeholder: { color: "#9CA3AF", fontSize: 16 },
  value: { color: "#111827" },
  icon: { fontSize: 18, color: "#6B7280" },
});
