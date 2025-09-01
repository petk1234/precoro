import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Document, DocumentStatus } from '../types';

interface DocumentDetailsScreenProps {
  route: { params: { document: Document } };
  navigation: any;
}

const getStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case DocumentStatus.DRAFT:
      return '#8E8E93';
    case DocumentStatus.PENDING:
      return '#FF9500';
    case DocumentStatus.APPROVED:
      return '#34C759';
    case DocumentStatus.REJECTED:
      return '#FF3B30';
    case DocumentStatus.CANCELLED:
      return '#FF3B30';
    default:
      return '#8E8E93';
  }
};

const getStatusText = (status: DocumentStatus) => {
  switch (status) {
    case DocumentStatus.DRAFT:
      return 'Чернетка';
    case DocumentStatus.PENDING:
      return 'Очікує';
    case DocumentStatus.APPROVED:
      return 'Затверджено';
    case DocumentStatus.REJECTED:
      return 'Відхилено';
    case DocumentStatus.CANCELLED:
      return 'Скасовано';
    default:
      return 'Невідомо';
  }
};

export const DocumentDetailsScreen: React.FC<DocumentDetailsScreenProps> = ({ route, navigation }) => {
  const { document } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Деталі документа</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <View style={styles.statusSection}>
            <Text style={styles.label}>Статус</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(document.status) }]}>
              <Text style={styles.statusText}>{getStatusText(document.status)}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Номер документа</Text>
            <Text style={styles.value}>{document.number}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Назва</Text>
            <Text style={styles.value}>{document.title}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Локація</Text>
            <Text style={styles.value}>{document.location.name}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Створив</Text>
            <Text style={styles.value}>{document.creator.name}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Дата створення</Text>
            <Text style={styles.value}>
              {new Date(document.createdAt).toLocaleDateString('uk-UA')}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Останнє оновлення</Text>
            <Text style={styles.value}>
              {new Date(document.updatedAt).toLocaleDateString('uk-UA')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '400',
    lineHeight: 22,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
}); 