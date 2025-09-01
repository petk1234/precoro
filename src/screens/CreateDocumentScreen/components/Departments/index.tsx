import { NestedTreeNode, Option as OptionType } from "../../../../types";
import styles from "../Locations/styles";
import { useQuery } from "@tanstack/react-query";
import { apiService, buildDepartmentTree } from "../../../../services/api";
import NestedOption from "../common/NestedOption";
import { View } from "react-native";

interface Props {
  selectedDepartment: OptionType;
  onSelect: (location: OptionType) => void;
}
const Departments = ({ selectedDepartment, onSelect }: Props) => {
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => apiService.getDepartments(),
  });

  const handleSelect = (id: number) => () => {
    const department = departments?.data.find(
      (department) => department.id === id
    );
    console.log(department);
    if (department) {
      onSelect({ id: department.id, value: department.name });
    }
  };

  return (
    <View style={styles.optionsContainer}>
      {buildDepartmentTree(departments?.data || [])?.map((departmentTree) => (
        <NestedOption
          key={departmentTree.id}
          nestedTree={departmentTree as NestedTreeNode}
          onSelect={handleSelect}
          level={0}
          selectedDepartment={selectedDepartment}
        />
      ))}
    </View>
  );
};

export default Departments;
