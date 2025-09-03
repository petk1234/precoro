import React from "react";
import { View, StyleSheet } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

interface CalendarPickerProps {
  onSelectDate: (isoDate: string) => void;
  initialDate?: string;
}

export const CalendarPicker = ({
  onSelectDate,
  initialDate,
}: CalendarPickerProps) => {
  const handleDayPress = (day: DateData) => {
    onSelectDate(day.dateString);
  };

  return (
    <View>
      <Calendar
        initialDate={initialDate}
        onDayPress={handleDayPress}
        enableSwipeMonths
        theme={{
          textDayFontFamily: "Inter-Medium",
          textMonthFontFamily: "Inter-SemiBold",
          textDayHeaderFontFamily: "Inter-Medium",
          monthTextColor: "#24324B",
          todayTextColor: "#007AFF",
          selectedDayBackgroundColor: "#3D5AFE",
          selectedDayTextColor: "#fff",
          dayTextColor: "#1D2452",
          arrowColor: "#24324B",
          arrowStyle: {
            backgroundColor: "#F4F4F6",
            borderRadius: 8,
            width: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        markedDates={
          initialDate ? { [initialDate]: { selected: true } } : undefined
        }
      />
    </View>
  );
};
