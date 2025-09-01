import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import CustomTextInput from "../components/CustomTextInput";
import RoundedButton from "../components/RoundedButton";

const schema = yup.object({
  email: yup.string().email("No account with this email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
});

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginScreen: React.FC = () => {
  const { login, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "test@email.com",
      password: "password",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      Alert.alert("Помилка", "Невірний email або пароль");
    }
  };
  console.log("ISOSOOSOSL: ", isLoading);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Precoro</Text>
          <Text style={styles.subtitle}>Увійдіть до системи</Text>
          <View style={styles.form}>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange } }) => (
                <CustomTextInput handleChangeText={onChange} label='Email' placeholder='mail@gmail.com' error={errors.email?.message} />
              )}
            />
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange } }) => (
                <CustomTextInput handleChangeText={onChange} label='Password' secured error={errors.password?.message} />
              )}
            />
            <View style={styles.button}>
              <RoundedButton disabled={isLoading} onPress={handleSubmit(onSubmit)}>
                Log in
              </RoundedButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
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
