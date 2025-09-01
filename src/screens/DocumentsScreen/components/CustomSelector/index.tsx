import { Text, TouchableOpacity } from "react-native";
import { CustomBottomSheet } from "../../../../components/CustomBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";

interface CustomSelectorProps {
  label: string;
  value?: string;
  layout: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}

const CustomSelector = ({
  label,
  value,
  layout,
  required,
  children,
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
    <>
      <Text style={styles.label}>
        {label} {required && <Text>*</Text>}
      </Text>
      <TouchableOpacity
        style={[styles.selectInput, value ? styles.inputFilled : undefined]}
        onPress={handleOpen}
      >
        <Text style={[styles.selectText, value ? styles.value : undefined]}>
          {value}
        </Text>
        <Text style={styles.chevron}>▾</Text>
      </TouchableOpacity>
      <CustomBottomSheet
        ref={bottomSheetRef}
        isVisible={open}
        backDropComponent={layout}
        onClose={handleClose}
      >
        {children}
      </CustomBottomSheet>
    </>
  );
};

export default CustomSelector;
