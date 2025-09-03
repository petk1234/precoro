import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CreateDocumentRequest, Option } from "../../types";
import { DatePickerInput } from "../../components/DatePickerInput";
import { DocumentsListStackParams } from "../../navigation/config";
import Header from "../../components/Header";
import CustomSelector from "../../components/CustomSelector";
import RoundedButton from "../../components/RoundedButton";
import Locations from "./components/Locations";
import Departments from "./components/Departments";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import { useCreateDocumentCreation } from "../../services/mutations/useCreateDocumentMutation";

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
  title,
}: DocumentsListStackParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const safeArea = useSafeAreaInsets();

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

  const handleSuccess = () => {
    Alert.alert("Success", "Document was created!", [
      {
        text: "OK",
        onPress: () => {
          reset();
          navigation.goBack();
        },
      },
    ]);
  };

  const createDocumentMutation = useCreateDocumentCreation(
    documentType,
    handleSuccess
  );

  const onSubmit = async (data: CreateDocumentFormData) => {
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
      <Header goBack title={title} />
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
                <View>
                  <DatePickerInput
                    label='Delivery Date'
                    required
                    value={value}
                    onChange={(date) =>
                      setValue("deliveryDate", date, { shouldValidate: true })
                    }
                  />
                  {errors?.deliveryDate && (
                    <Text style={styles.errorText}>
                      {String(errors.deliveryDate.message)}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name='location'
              render={({ field: { value } }) => (
                <View>
                  <CustomSelector
                    label='Location'
                    required
                    value={value.value}
                    placeholder='Select'
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
                </View>
              )}
            />

            <Controller
              control={control}
              name='department'
              render={({ field: { value } }) => (
                <View>
                  <CustomSelector
                    label='Department'
                    required
                    value={value.value}
                    placeholder='Select'
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
                </View>
              )}
            />
            <View style={styles.spacer} />
            <View
              style={{
                marginBottom: safeArea.top + 50,
              }}
            >
              <RoundedButton
                disabled={!isValid || isLoading}
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
