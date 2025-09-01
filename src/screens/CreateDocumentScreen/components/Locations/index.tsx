import { Text, TouchableOpacity, View } from "react-native";
import { useFiltersQuery } from "../../../../services/queries/useFiltersQuery";
import { Filters, Option as OptionType } from "../../../../types";
import styles from "./styles";
import Option from "../common/Option";

interface Props {
  selectedLocation: OptionType;
  onSelect: (location: OptionType) => void;
}
const Locations = ({ selectedLocation, onSelect }: Props) => {
  const { filterOptions: locations } = useFiltersQuery(Filters.locations);

  const handleSelect = (id: number) => () => {
    const location = locations?.data.find((location) => location.id === id);
    if (location) {
      onSelect({ id: location.id, value: location.name });
    }
  };

  return (
    <View style={styles.optionsContainer}>
      {locations?.data.map((location) => (
        <Option
          key={location.id}
          text={location.name}
          onSelect={handleSelect(location.id)}
          isSelected={selectedLocation.id === location.id}
        />
      ))}
    </View>
  );
};

export default Locations;
