import React, { useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CalendarPicker } from "../CalendarPicker";
import { CustomBottomSheet } from "../CustomBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import styles from "./styles";

interface DatePickerInputProps {
  label: string;
  value?: string;
  layout: React.ReactNode;
  onChange: (date: string) => void;
  required?: boolean;
}

export const DatePickerInput = ({
  label,
  value,
  layout,
  onChange,
  required,
}: DatePickerInputProps) => {
  const [open, setOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const display = useMemo(() => value || "YYYY-MM-DD", [value]);

  const handleOpen = () => {
    bottomSheetRef.current?.present();
    setOpen(true);
  };

  const onSelect = (date: string) => {
    onChange(date);
    setOpen(false);
  };

  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>

        <TouchableOpacity
          style={[styles.input, value && styles.inputFilled]}
          onPress={handleOpen}
        >
          <Text style={[styles.placeholder, value && styles.value]}>
            {display}
          </Text>
          <Text style={styles.icon}>📅</Text>
        </TouchableOpacity>
      </View>

      <CustomBottomSheet
        ref={bottomSheetRef}
        isVisible={open}
        backDropComponent={layout}
      >
        <CalendarPicker onSelectDate={onSelect} initialDate={value} />
      </CustomBottomSheet>
    </>
  );
};
