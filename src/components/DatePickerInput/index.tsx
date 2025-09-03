import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CalendarPicker } from "../CalendarPicker";
import { CustomBottomSheet } from "../CustomBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import styles from "./styles";
import { Calendar } from "../../../assets";

interface DatePickerInputProps {
  label: string;
  value?: string;
  layout?: React.ReactNode;
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
      <View style={styles.wrapper}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>

        <TouchableOpacity
          style={[
            styles.input,
            value && styles.inputFilled,
            open && styles.opened,
          ]}
          onPress={handleOpen}
        >
          <Text style={[styles.placeholder, value && styles.inputFilled]}>
            {display}
          </Text>
          <Calendar />
        </TouchableOpacity>
      </View>

      <CustomBottomSheet
        ref={bottomSheetRef}
        isVisible={open}
        backDropComponent={layout}
        onClose={handleClose}
      >
        <CalendarPicker onSelectDate={onSelect} initialDate={value} />
      </CustomBottomSheet>
    </>
  );
};
