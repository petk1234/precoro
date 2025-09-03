import React, { memo, useState } from "react";
import { Image, TouchableOpacityProps } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Pressable } from "react-native";
import { CheckIc } from "../../../assets";
import { COLORS } from "../../theme/colors";
import styles from "./styles";

export interface CheckboxProps extends Omit<TouchableOpacityProps, "onPress"> {
  checked?: boolean;
  onPress?: (value: boolean) => void;
}

const Checkbox = ({ checked, style, onPress, ...props }: CheckboxProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const animatedContainerStyles = useAnimatedStyle(() => ({
    backgroundColor: checked || isSelected ? COLORS.elements.active : "#fff",
  }));

  const handlePress = () => {
    checked === undefined && setIsSelected(!isSelected);
    onPress?.(!checked);
  };

  return (
    <Pressable
      activeOpacity={0.6}
      testID='Checkbox'
      onPress={handlePress}
      {...props}
    >
      <Animated.View
        style={[
          styles.container,
          animatedContainerStyles,
          (checked || isSelected) && { borderColor: COLORS.elements.active },
        ]}
      >
        {(checked || isSelected) && (
          <Animated.View entering={FadeIn}>
            {(checked || isSelected) && <CheckIc />}
          </Animated.View>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default memo(Checkbox);
