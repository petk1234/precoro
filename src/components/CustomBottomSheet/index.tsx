import React, { ForwardedRef, useMemo } from "react";
import { Text, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomBottomSheet {
  isVisible: boolean;
  onClose: () => void;
  backDropComponent?: React.ReactNode;
  children: React.ReactNode;
  ref: ForwardedRef<BottomSheetModal<any>> | undefined;
  footer?: React.ReactNode;
}

export const CustomBottomSheet = ({
  isVisible,
  onClose,
  children,
  ref,
  footer,
}: CustomBottomSheet) => {
  const safeArea = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["50%", "50%"], []);

  if (!isVisible) return null;

  const renderLayoutWrapper = () => (
    <View style={styles.transparentLayout}></View>
  );

  return (
    <>
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderLayoutWrapper}
        onChange={(index) => {
          index === -1 && onClose?.();
        }}
        footerComponent={() => footer}
      >
        <BottomSheetScrollView>{children}</BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};
