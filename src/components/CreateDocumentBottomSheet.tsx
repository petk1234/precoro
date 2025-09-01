import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
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

interface CreateDocumentBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  documentType: 'purchaseorders' | 'purchaserequisitions';
}

export const CreateDocumentBottomSheet: React.FC<CreateDocumentBottomSheetProps> = ({
  isVisible,
  onClose,
  documentType,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const queryClient = useQueryClient();

  const snapPoints = useMemo(() => ['25%', '75%'], []);

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

  const { data: locations } = useQuery({
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
      reset();
      onClose();
    },
    onError: (error) => {
      console.error('Error creating document:', error);
    },
  });

  const onSubmit = useCallback((data: any) => {
    if (data.locationId === 0) {
      return;
    }
    createDocumentMutation.mutate(data);
  }, [createDocumentMutation]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const getTitle = () => {
    return documentType === 'purchaseorders'
      ? 'Створити замовлення'
      : 'Створити заявку';
  };

  if (!isVisible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onClose={handleClose}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{getTitle()}</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Назва документа *</Text>
              <BottomSheetTextInput
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
                {locations?.data?.map((location: any) => (
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
              <BottomSheetTextInput
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
          style={[styles.button, createDocumentMutation.isPending && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={createDocumentMutation.isPending}
        >
          <Text style={styles.buttonText}>
            {createDocumentMutation.isPending ? 'Створення...' : 'Створити документ'}
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666666',
  },
  inputContainer: {
    marginBottom: 20,
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