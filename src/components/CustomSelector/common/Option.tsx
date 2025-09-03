import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { memo } from "react";
import { Selected } from "../../../../assets";

interface Props {
  text: string;
  onSelect?: () => void;
  isSelected: boolean;
  customStyle?: Object;
}

const Option = ({ text, onSelect, isSelected, customStyle }: Props) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={[styles.option, isSelected && styles.selected, customStyle]}>
        <Text style={isSelected && styles.selected}>{text}</Text>
        {isSelected && <Selected />}
      </View>
    </TouchableOpacity>
  );
};

export default memo(Option);
