import React from "react";
import { View, ScrollView, Keyboard, ImageBackground } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import CustomTextInput from "../../components/CustomTextInput";
import RoundedButton from "../../components/RoundedButton";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../theme/colors";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { LogoExtended } from "../../../assets";
import styles from "./styles";

const schema = yup.object({
  email: yup
    .string()
    .email("No account with this email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const { login, isLoading, error } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  return (
    <TouchableWithoutFeedback
      style={styles.touchable}
      onPress={Keyboard.dismiss}
    >
      <LinearGradient
        style={styles.container}
        colors={[COLORS.main.bg.gradient1, COLORS.main.bg.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ImageBackground
          style={styles.container}
          imageStyle={styles.bgImg}
          source={require("../../../assets/lines-native.png")}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.content}>
              <View style={styles.logo}>
                <LogoExtended />
              </View>
              <View style={styles.form}>
                <Controller
                  control={control}
                  name='email'
                  render={({ field: { onChange } }) => (
                    <CustomTextInput
                      handleChangeText={onChange}
                      label='Email'
                      placeholder='mail@gmail.com'
                      error={errors.email?.message || error}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='password'
                  render={({ field: { onChange } }) => (
                    <CustomTextInput
                      handleChangeText={onChange}
                      label='Password'
                      secured
                      error={errors.password?.message}
                    />
                  )}
                />
                <View style={styles.button}>
                  <RoundedButton
                    disabled={isLoading}
                    onPress={handleSubmit(onSubmit)}
                  >
                    Log in
                  </RoundedButton>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};
