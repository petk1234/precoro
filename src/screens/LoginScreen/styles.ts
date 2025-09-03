import { StyleSheet } from "react-native";

export default StyleSheet.create({
  touchable: {
    height: "100%",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    height: "70%",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 42,
  },
  bgImg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 42,
    height: "50%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    width: "100%",
    rowGap: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  inputError: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
