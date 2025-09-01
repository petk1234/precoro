import { Text, TouchableOpacity, View } from "react-native";
import { RightArr } from "../../../../../../../assets";
import styles from "./styles";
import Header from "../../../../../../components/Header";
import { useEffect, useState } from "react";
import SpecificFilters from "../SpecificFilters";
import { Filters } from "../../../../../../types";
import { useFilters } from "../../../../../../contexts/FiltersContext";

const FILTER_OPTIONS: `${Filters}`[] = ["Status", "Locations", "Creators"];

const GeneralFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState<`${Filters}` | null>(
    null
  );
  const { updateFilters } = useFilters();

  const renderOption = (title: `${Filters}`) => (
    <TouchableOpacity key={title} onPress={() => setSelectedFilter(title)}>
      <View style={styles.rowOuter}>
        <Text style={styles.optionText}>{title}</Text>
        <View style={styles.redirect}>
          <RightArr />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {!selectedFilter && (
        <>
          <Header title='Filter & Sort' customStyles={{ fontSize: 16 }} />
          <View style={styles.list}>
            {FILTER_OPTIONS.map((option) => renderOption(option))}
          </View>
        </>
      )}
      {selectedFilter && (
        <SpecificFilters
          filterType={selectedFilter}
          goBack={() => {
            updateFilters({ optionsChoosed: null });
            setSelectedFilter(null);
          }}
        />
      )}
    </View>
  );
};

export default GeneralFilters;
