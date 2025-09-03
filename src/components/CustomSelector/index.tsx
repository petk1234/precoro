import { Text, TouchableOpacity, View } from "react-native";
import { CustomBottomSheet } from "../CustomBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { TopArr } from "../../../assets";
import { COLORS } from "../../theme/colors";

interface CustomSelectorProps {
  label: string;
  value?: string;
  layout?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  placeholder?: string;
}

const CustomSelector = ({
  label,
  value,
  layout,
  required,
  children,
  placeholder,
}: CustomSelectorProps) => {
  const [open, setOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpen = () => {
    bottomSheetRef.current?.present();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [open]);
  return (
    <View>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TouchableOpacity
        style={[styles.selectInput, open ? styles.inputFilled : undefined]}
        onPress={handleOpen}
      >
        <Text style={[styles.selectText, value ? styles.value : undefined]}>
          {value || placeholder}
        </Text>
        <View style={{ transform: [{ rotate: open ? "0deg" : "180deg" }] }}>
          <TopArr fill={COLORS.main.secondary[600]} />
        </View>
      </TouchableOpacity>
      <CustomBottomSheet
        ref={bottomSheetRef}
        isVisible={open}
        backDropComponent={layout}
        onClose={handleClose}
      >
        {children}
      </CustomBottomSheet>
    </View>
  );
};

export default CustomSelector;
