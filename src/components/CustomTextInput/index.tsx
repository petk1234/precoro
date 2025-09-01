import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SecureEye } from "../../../assets";
import styles from "./styles";
import { memo, useState } from "react";

interface Props {
  handleChangeText: (text: string) => void;
  secured?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
}

const CustomTextInput = ({
  handleChangeText,
  secured = false,
  placeholder,
  label,
  error,
}: Props) => {
  const [isHidden, setIHidden] = useState(false);
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={handleChangeText}
          secureTextEntry={secured && isHidden}
          style={[styles.inputBase, error && styles.errorInput]}
          placeholder={placeholder || ""}
        />
        {secured && (
          <TouchableWithoutFeedback onPress={() => setIHidden(!isHidden)}>
            <View style={styles.secureEye}>
              <SecureEye />
            </View>
          </TouchableWithoutFeedback>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

export default memo(CustomTextInput);
