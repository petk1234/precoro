import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateDocumentRequest } from '../types';
import { apiService } from '../services/api';

const schema = yup.object({
  title: yup.string().min(3, 'Назва має бути не менше 3 символів').required('Назва обов\'язкова'),
  locationId: yup.number().required('Виберіть локацію'),
  description: yup.string().optional(),
});

interface CreateDocumentModalScreenProps {
  route: { params: { documentType: 'purchaseorders' | 'purchaserequisitions' } };
  navigation: any;
}

export const CreateDocumentModalScreen: React.FC<CreateDocumentModalScreenProps> = ({ route, navigation }) => {
  const { documentType } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      locationId: 0,
      description: '',
    },
  });

  const { data: locations = [] } = useQuery({
    queryKey: ['locations'],
    queryFn: () => apiService.getLocations(),
  });

  const createDocumentMutation = useMutation({
    mutationFn: (data: CreateDocumentRequest) => {
      if (documentType === 'purchaseorders') {
        return apiService.createPurchaseOrder(data);
      } else {
        return apiService.createPurchaseRequisition(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [documentType] });
      Alert.alert(
        'Успішно',
        'Документ створено',
        [
          {
            text: 'OK',
            onPress: () => {
              reset();
              navigation.goBack();
            },
          },
        ]
      );
    },
    onError: (error) => {
      Alert.alert('Помилка', 'Не вдалося створити документ');
    },
  });

  const onSubmit = async (data: any) => {
    if (data.locationId === 0) {
      Alert.alert('Помилка', 'Виберіть локацію');
      return;
    }

    setIsLoading(true);
    try {
      await createDocumentMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    return documentType === 'purchaseorders'
      ? 'Створити замовлення на закупівлю'
      : 'Створити заявку на закупівлю';
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Назад</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{getTitle()}</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Назва документа *</Text>
                <TextInput
                  style={[styles.input, errors.title && styles.inputError]}
                  placeholder="Введіть назву документа"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={3}
                />
                {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="locationId"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Локація *</Text>
                <View style={styles.pickerContainer}>
                  {locations.map((location) => (
                    <TouchableOpacity
                      key={location.id}
                      style={[
                        styles.locationOption,
                        value === location.id && styles.locationOptionSelected,
                      ]}
                      onPress={() => onChange(location.id)}
                    >
                      <Text
                        style={[
                          styles.locationOptionText,
                          value === location.id && styles.locationOptionTextSelected,
                        ]}
                      >
                        {location.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.locationId && <Text style={styles.errorText}>{errors.locationId.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Опис (необов'язково)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Введіть опис документа"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={4}
                />
              </View>
            )}
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Створення...' : 'Створити документ'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  locationOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  locationOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  locationOptionText: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  locationOptionTextSelected: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 