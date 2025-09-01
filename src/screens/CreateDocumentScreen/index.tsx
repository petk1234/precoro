import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Button,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDocumentRequest, Option } from "../../types";
import { apiService } from "../../services/api";
import { DatePickerInput } from "../../components/DatePickerInput";
import { DocumentsListStackParams } from "../../navigation/config";
import Header from "../../components/Header";
import CustomSelector from "../DocumentsScreen/components/CustomSelector";
import RoundedButton from "../../components/RoundedButton";
import Locations from "./components/Locations";
import Departments from "./components/Departments";
import { useNavigation } from "@react-navigation/native";

const schema = yup.object({
  deliveryDate: yup.string().required("Delivery date is required"),
  location: yup
    .object({
      id: yup.number().required("Location is required"),
      value: yup.string().required("Location is required"),
    })
    .required("Location is required"),
  department: yup
    .object({
      id: yup.number().required("Department is required"),
      value: yup.string().required("Department is required"),
    })
    .required("Department is required"),
});

type CreateDocumentFormData = {
  deliveryDate: string;
  location: Option;
  department: Option;
};

const DEFAULT_OPTION: Option = {
  id: 0,
  value: "",
};

export const CreateDocumentScreen = ({
  documentType,
}: DocumentsListStackParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<CreateDocumentFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      deliveryDate: "",
      location: DEFAULT_OPTION,
      department: DEFAULT_OPTION,
    },
  });

  const createDocumentMutation = useMutation({
    mutationFn: (data: CreateDocumentRequest) => {
      if (documentType === "purchaseorders") {
        return apiService.createPurchaseOrder(data);
      } else {
        return apiService.createPurchaseRequisition(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [documentType] });
      Alert.alert("Успішно", "Документ створено", [
        {
          text: "OK",
          onPress: () => {
            reset();
            navigation.goBack();
          },
        },
      ]);
    },
    onError: () => {
      Alert.alert("Помилка", "Не вдалося створити документ");
    },
  });

  const onSubmit = async (data: CreateDocumentFormData) => {
    console.log("djdjddjj");
    if (data.location.id === 0) {
      Alert.alert("Помилка", "Виберіть локацію");
      return;
    }
    if (data.department.id === 0) {
      Alert.alert("Помилка", "Виберіть департамент");
      return;
    }
    const payload: CreateDocumentRequest = {
      deliveryDate: data.deliveryDate,
      location: data.location.id,
      department: data.department.id,
    };
    setIsLoading(true);
    try {
      await createDocumentMutation.mutateAsync(payload);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Header title='Create Document' />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.form}>
            <Controller
              control={control}
              name='deliveryDate'
              render={({ field: { value } }) => (
                <>
                  <DatePickerInput
                    label='Delivery Date'
                    required
                    value={value}
                    onChange={(date) =>
                      setValue("deliveryDate", date, { shouldValidate: true })
                    }
                    layout={
                      <CreateDocumentScreen documentType={documentType} />
                    }
                  />
                  {errors?.deliveryDate && (
                    <Text style={styles.errorText}>
                      {String(errors.deliveryDate.message)}
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name='location'
              render={({ field: { value } }) => (
                <>
                  <CustomSelector
                    label='Location'
                    required
                    value={value.value}
                    layout={
                      <CreateDocumentScreen documentType={documentType} />
                    }
                  >
                    <Locations
                      selectedLocation={value}
                      onSelect={(value: Option) =>
                        setValue("location", value, { shouldValidate: true })
                      }
                    />
                  </CustomSelector>
                  {errors?.location?.value?.message && (
                    <Text style={styles.errorText}>
                      {String(errors?.location?.value?.message)}
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name='department'
              render={({ field: { value } }) => (
                <>
                  <CustomSelector
                    label='Department'
                    required
                    value={value.value}
                    layout={
                      <CreateDocumentScreen documentType={documentType} />
                    }
                  >
                    <Departments
                      selectedDepartment={value}
                      onSelect={(value: Option) =>
                        setValue("department", value, { shouldValidate: true })
                      }
                    />
                  </CustomSelector>
                  {errors?.department?.value?.message && (
                    <Text style={styles.errorText}>
                      {String(errors?.department?.value?.message)}
                    </Text>
                  )}
                </>
              )}
            />
            <View style={styles.spacer} />
            <View
              style={{ width: "100%", flex: 1, justifyContent: "flex-end" }}
            >
              <RoundedButton
                disabled={!isValid}
                onPress={handleSubmit(onSubmit)}
              >
                Create
              </RoundedButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  },
  spacer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
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
    textAlignVertical: "top",
  },
  selectInput: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  selectText: { color: "#9CA3AF", fontSize: 16 },
  value: { color: "#111827" },
  chevron: { color: "#6B7280", fontSize: 16 },
  inputFilled: {
    backgroundColor: "#fff",
    borderColor: "#3D5AFE",
  },
  inputError: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginTop: 4,
  },
  pickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  locationOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#ffffff",
  },
  locationOptionSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  locationOptionText: {
    fontSize: 14,
    color: "#1a1a1a",
  },
  locationOptionTextSelected: {
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
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
