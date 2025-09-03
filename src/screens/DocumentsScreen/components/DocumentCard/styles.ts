import { StyleSheet } from "react-native";
import { COLORS } from "../../../../theme/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    height: 120,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  indicator: {
    height: "100%",
    width: 8,
  },
  info: {
    display: "flex",
    width: "100%",
    height: "100%",
    padding: 12,
    paddingRight: 20,
    rowGap: 12,
  },
  rowTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rowBottom: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  notionText: {
    color: COLORS.main.primary["600"],
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
  },
  infoText: {
    color: COLORS.main.blue["100"],
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  number: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
