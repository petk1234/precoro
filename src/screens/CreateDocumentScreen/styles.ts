import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  form: {
    padding: 16,
    height: "100%",
    rowGap: 8,
  },
  spacer: {
    flex: 1,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
});
