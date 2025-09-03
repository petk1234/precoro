import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { memo, useState } from "react";
import { TopArr } from "../../../../assets";
import {
  DepartmentTreeNode,
  NestedTreeNode,
  Option as OptionType,
} from "../../../types";
import Option from "./Option";
import { COLORS } from "../../../theme/colors";

interface Props {
  nestedTree: NestedTreeNode;
  onSelect: (id: number) => () => void;
  level: number;
  selectedDepartment: OptionType;
}

const NestedOption = ({
  nestedTree,
  level,
  selectedDepartment,
  onSelect,
}: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      {selectedDepartment.id === nestedTree.id ? (
        <Option
          text={nestedTree.name}
          isSelected={selectedDepartment.id === nestedTree.id}
          customStyle={{ marginLeft: level * 10 }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            if ((nestedTree.children?.length || 0) > 0) {
              setIsSelected(!isSelected);
              return;
            }
            onSelect(nestedTree.id)();
          }}
        >
          <View style={[styles.nestedOption, { paddingLeft: 10 * level }]}>
            {(nestedTree.children?.length || 0 > 0) && (
              <View
                style={{
                  transform: [
                    isSelected ? { rotate: "90deg" } : { rotate: "0deg" },
                  ],
                }}
              >
                <TopArr
                  fill={
                    isSelected
                      ? COLORS.elements.active
                      : COLORS.main.secondary[600]
                  }
                />
              </View>
            )}
            <Text
              style={{ color: isSelected ? COLORS.elements.active : "#000" }}
            >
              {nestedTree.name}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {isSelected &&
        (nestedTree.children?.length || 0) > 0 &&
        selectedDepartment.id !== nestedTree.id &&
        nestedTree.children?.map((nestedTree) => (
          <NestedOption
            onSelect={onSelect}
            key={nestedTree.id}
            nestedTree={nestedTree}
            level={level + 1}
            selectedDepartment={selectedDepartment}
          />
        ))}
    </>
  );
};

export default memo(NestedOption);
