import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Document, DocumentStatus, Statuses } from "../../../../types";
import styles from "./styles";
import { COLORS } from "../../../../theme/colors";

interface DocumentCardProps {
  document: Document;
}

const getStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case DocumentStatus.DRAFT:
      return COLORS.labels.draft;
    case DocumentStatus.PENDING:
      return COLORS.labels.pending;
    case DocumentStatus.APPROVED:
      return COLORS.labels.approved;
    case DocumentStatus.REJECTED:
      return COLORS.labels.rejected;
    case DocumentStatus.CANCELLED:
      return COLORS.labels.cancelled;
  }
};

const getStatusText = (status: DocumentStatus) => {
  switch (status) {
    case DocumentStatus.DRAFT:
      return Statuses.draft;
    case DocumentStatus.PENDING:
      return Statuses.pending;
    case DocumentStatus.APPROVED:
      return Statuses.approved;
    case DocumentStatus.REJECTED:
      return Statuses.rejected;
    case DocumentStatus.CANCELLED:
      return Statuses.cancelled;
  }
};

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const prepareReadableDate = (date: string) => {
    const parsedDate = new Date(date);
    const formattedDate = parsedDate
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .replace(",", "");
    return formattedDate;
  };
  const statusColor = getStatusColor(document.status);

  return (
    <View style={styles.container}>
      <View
        style={[styles.indicator, { backgroundColor: statusColor?.[200] }]}
      ></View>
      <View style={styles.info}>
        <View style={styles.rowTop}>
          <View>
            <Text style={styles.infoText}>{document.department.name}</Text>
            <Text style={styles.notionText}>
              {prepareReadableDate(document.date)}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColor?.[100] },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColor?.[300] }]}>
              {getStatusText(document.status)}
            </Text>
          </View>
        </View>
        <View style={styles.rowBottom}>
          <View>
            <Text style={styles.notionText}>Requested by</Text>
            <Text style={[styles.infoText, { fontWeight: 500 }]}>
              {document.creator.name}
            </Text>
          </View>
          <View>
            <Text style={styles.infoText}>
              {document.sum}
              {document.currency}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
