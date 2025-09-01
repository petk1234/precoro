import { Text, TouchableOpacity, View } from "react-native";
import { useFiltersQuery } from "../../../../../../services/queries/useFiltersQuery";
import {
  Creator,
  Filters,
  filterToContextMapper,
  Location,
  Statuses,
} from "../../../../../../types";
import Header from "../../../../../../components/Header";
import styles from "../GeneralFilters/styles";
import { useEffect, useState } from "react";
import CheckBox from "../../../../../../components/CheckBox";
import { Back } from "../../../../../../../assets";
import { COLORS } from "../../../../../../theme/colors";
import { useFilters } from "../../../../../../contexts/FiltersContext";

interface Props {
  filterType: `${Filters}`;
  goBack: () => void;
}

const STATUSES_FILTERS = [
  {
    id: 0,
    name: Statuses.draft,
  },
  {
    id: 1,
    name: Statuses.pending,
  },
  {
    id: 2,
    name: Statuses.approved,
  },
  {
    id: 3,
    name: Statuses.rejected,
  },
  {
    id: 4,
    name: Statuses.cancelled,
  },
];

const SpecificFilters = ({ filterType, goBack }: Props) => {
  const filterContextKey = filterToContextMapper[filterType];
  const { filterOptions } = useFiltersQuery(filterType);
  const { filters, updateFilters } = useFilters();
  const [choosedFilters, setChoosedFilters] = useState<number[]>(
    filters[filterContextKey]
  );

  const handleSearch = () => {
    updateFilters({
      [filterContextKey]: choosedFilters,
      page: 1,
    });
  };

  const handleFilterUpdate = (value: number) => {
    setChoosedFilters(
      (choosedFilters?.includes(value)
        ? choosedFilters.filter((el) => el !== value)
        : [...choosedFilters, value]
      ).filter((el) => el >= 0)
    );
  };

  const renderOption = (filterOption: Location | Creator) => (
    <TouchableOpacity
      key={filterOption.id}
      onPress={() => handleFilterUpdate(filterOption.id)}
    >
      <View style={styles.rowInternal}>
        <CheckBox
          checked={choosedFilters.some((el) => el === filterOption.id)}
        />
        <Text style={styles.optionText}>
          {(filterOption as any).email || filterOption.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    choosedFilters.length > 0 &&
      filters.optionsChoosed === null &&
      updateFilters({ optionsChoosed: true });
    choosedFilters.length === 0 && updateFilters({ optionsChoosed: null });
    if (filters.optionsChoosed === false) {
      handleSearch();
    }
  }, [choosedFilters, filters.optionsChoosed]);

  return (
    <View>
      <Header
        title={filterType}
        customStyles={{ fontSize: 16 }}
        renderLeftButton={
          <TouchableOpacity onPress={goBack}>
            <View
              style={{
                width: 24,
                height: 24,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Back fill={COLORS.elements.active} />
            </View>
          </TouchableOpacity>
        }
      />
      <View style={styles.list}>
        {(filterType === "Status"
          ? STATUSES_FILTERS
          : filterOptions?.data
        )?.map((option) => renderOption(option))}
      </View>
    </View>
  );
};

export default SpecificFilters;
