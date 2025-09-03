import React from "react";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { DocumentStatus, Statuses } from "../../../../types";
import { useFilters } from "../../../../contexts/FiltersContext";
import styles from "./styles";

const statusConfig = [
  { status: DocumentStatus.ALL, label: Statuses.all },
  { status: DocumentStatus.DRAFT, label: Statuses.draft },
  { status: DocumentStatus.PENDING, label: Statuses.pending },
  { status: DocumentStatus.APPROVED, label: Statuses.approved },
  { status: DocumentStatus.REJECTED, label: Statuses.rejected },
  { status: DocumentStatus.CANCELLED, label: Statuses.cancelled },
];

export const StatusesBar = () => {
  const { filters, updateFilters } = useFilters();

  const toggleStatus = (status: DocumentStatus) => {
    if (status === DocumentStatus.ALL) {
      updateFilters({ statuses: [], page: 1 });
      return;
    }
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];

    updateFilters({ statuses: newStatuses, page: 1 });
  };

  const isStatusSelected = (status: DocumentStatus) =>
    filters.statuses.includes(status) ||
    (status === DocumentStatus.ALL && filters.statuses.length === 0);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {statusConfig.map(({ status, label }) => (
        <TouchableOpacity key={status} onPress={() => toggleStatus(status)}>
          <View
            style={[
              styles.statusChip,
              isStatusSelected(status) && styles.selectedChip,
            ]}
          >
            <Text
              style={[
                styles.statusLabel,
                isStatusSelected(status) && styles.selectedLabel,
              ]}
            >
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
