import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { DepartmentTreeNode } from '../types';

interface TreeSelectBottomSheetProps {
  visible: boolean;
  title?: string;
  tree: DepartmentTreeNode[];
  selectedId?: number | null;
  onSelect: (id: number) => void;
  onClose: () => void;
}

type Row = { depth: number; node: DepartmentTreeNode };

const flatten = (nodes: DepartmentTreeNode[], depth = 0): Row[] => {
  const out: Row[] = [];
  nodes.forEach((n) => {
    out.push({ depth, node: n });
    if (n.children && n.children.length) {
      out.push(...flatten(n.children, depth + 1));
    }
  });
  return out;
};

export const TreeSelectBottomSheet: React.FC<TreeSelectBottomSheetProps> = ({
  visible,
  title = 'Select',
  tree,
  selectedId,
  onSelect,
  onClose,
}) => {
  const ref = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['45%', '75%'], []);
  const rows = useMemo(() => flatten(tree), [tree]);

  if (!visible) return null;

  return (
    <BottomSheet ref={ref} index={1} snapPoints={snapPoints} enablePanDownToClose onClose={onClose}>
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={rows}
          keyExtractor={(item) => String(item.node.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.row, { paddingLeft: 12 + item.depth * 16 }]}
              onPress={() => { onSelect(item.node.id); onClose(); }}
            >
              <Text style={[styles.optionText, item.node.id === selectedId && styles.optionTextSelected]}>
                {item.node.name}
              </Text>
              {item.node.id === selectedId && <Text style={styles.check}>✓</Text>}
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
    borderRadius: 8,
  },
  optionText: { fontSize: 16, color: '#111827' },
  optionTextSelected: { color: '#3D5AFE' },
  check: { color: '#3D5AFE', fontWeight: '700', paddingRight: 8 },
  separator: { height: 1, backgroundColor: '#EEF2F7' },
}); 