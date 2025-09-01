import React, { useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

interface Option {
  id: number;
  name: string;
}

interface OptionSelectBottomSheetProps {
  visible: boolean;
  title?: string;
  options: Option[];
  selectedId?: number | null;
  onSelect: (id: number) => void;
  onClose: () => void;
}

export const OptionSelectBottomSheet: React.FC<OptionSelectBottomSheetProps> = ({
  visible,
  title = 'Select',
  options,
  selectedId,
  onSelect,
  onClose,
}) => {
  const ref = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['35%', '60%'], []);

  if (!visible) return null;

  return (
    <BottomSheet ref={ref} index={1} snapPoints={snapPoints} enablePanDownToClose onClose={onClose}>
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={options}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row} onPress={() => { onSelect(item.id); onClose(); }}>
              <Text style={[styles.optionText, selectedId === item.id && styles.optionTextSelected]}>
                {item.name}
              </Text>
              {selectedId === item.id && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 16, fontWeight: '600', color: '#24324B', marginBottom: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  optionText: { fontSize: 16, color: '#111827' },
  optionTextSelected: { color: '#3D5AFE' },
  check: { color: '#3D5AFE', fontWeight: '700' },
  separator: { height: 1, backgroundColor: '#EEF2F7' },
}); 