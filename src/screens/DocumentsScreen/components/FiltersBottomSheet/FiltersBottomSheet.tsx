import React, { useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import styles from "./styles";
import GeneralFilters from "./components/GeneralFilters";
import { DocumentsScreen } from "../../../DocumentsScreen/index";
import { DocumentTypes } from "../../../../navigation/config";

interface FiltersBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  documentType: `${DocumentTypes}`;
}

export const FiltersBottomSheet: React.FC<FiltersBottomSheetProps> = ({
  isVisible,
  onClose,
  documentType,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "50%"], []);

  if (!isVisible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onClose={onClose}
      enablePanDownToClose
      backdropComponent={() => (
        <View style={[styles.transparentLayout, { position: "relative" }]}>
          <DocumentsScreen documentType={documentType} />
          <View style={styles.transparentLayout}></View>
        </View>
      )}
    >
      <View style={{ display: "flex", flex: 1 }}>
        <BottomSheetScrollView>
          <GeneralFilters />
        </BottomSheetScrollView>
      </View>
    </BottomSheet>
  );
};
