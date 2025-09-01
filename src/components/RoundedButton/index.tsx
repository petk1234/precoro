import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  children: string;
  disabled?: boolean;
  onPress: () => void;
}

const RoundedButton = ({ children, disabled = false, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonContainer, disabled && styles.disabled]}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoundedButton;
