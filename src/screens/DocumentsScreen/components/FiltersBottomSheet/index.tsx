import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDocumentRequest } from "../../../../types";
import { apiService } from "../../../../services/api";
import { DocumentTypes } from "../../../../navigation/config";
import styles from "./styles";

const schema = yup.object({
  title: yup.string().min(3, "Назва має бути не менше 3 символів").required("Назва обов'язкова"),
  locationId: yup.number().required("Виберіть локацію"),
  description: yup.string().optional(),
});

interface FiltersBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  documentType: `${DocumentTypes}`;
}

export const FiltersBottomSheet: React.FC<FiltersBottomSheetProps> = ({ isVisible, onClose, documentType }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const queryClient = useQueryClient();

  const snapPoints = useMemo(() => ["25%", "75%"], []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      locationId: 0,
      description: "",
    },
  });

  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: () => apiService.getLocations(),
  });

  const createDocumentMutation = useMutation({
    mutationFn: (data: CreateDocumentRequest) => {
      if (documentType === DocumentTypes.purchaseOrders) {
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
      console.error("Error creating document:", error);
    },
  });

  const onSubmit = useCallback(
    (data: any) => {
      if (data.locationId === 0) {
        return;
      }
      createDocumentMutation.mutate(data);
    },
    [createDocumentMutation]
  );

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const getTitle = () => {
    return documentType === DocumentTypes.purchaseOrders ? "Створити замовлення" : "Створити заявку";
  };

  if (!isVisible) return null;

  return (
    <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} onClose={handleClose} enablePanDownToClose>
      <BottomSheetView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{getTitle()}</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <Controller
          control={control}
          name='title'
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Назва документа *</Text>
              <BottomSheetTextInput
                style={[styles.input, errors.title && styles.inputError]}
                placeholder='Введіть назву документа'
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
          name='locationId'
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Локація *</Text>
              <View style={styles.pickerContainer}>
                {locations?.data.map((location) => (
                  <TouchableOpacity
                    key={location.id}
                    style={[styles.locationOption, value === location.id && styles.locationOptionSelected]}
                    onPress={() => onChange(location.id)}
                  >
                    <Text style={[styles.locationOptionText, value === location.id && styles.locationOptionTextSelected]}>{location.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.locationId && <Text style={styles.errorText}>{errors.locationId.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Опис (необов'язково)</Text>
              <BottomSheetTextInput
                style={styles.input}
                placeholder='Введіть опис документа'
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
          <Text style={styles.buttonText}>{createDocumentMutation.isPending ? "Створення..." : "Створити документ"}</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};
