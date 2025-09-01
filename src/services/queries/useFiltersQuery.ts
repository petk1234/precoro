import { useQuery } from "@tanstack/react-query";
import { apiService } from "../api";
import { useAuth } from "../../contexts/AuthContext";
import {
  ApiResponse,
  Creator,
  DocumentMeta,
  Filters,
  Location,
} from "../../types";

export const useFiltersQuery = (
  filterType: Omit<`${Filters}`, Filters.status>
) => {
  const {
    data: filterOptions,
    isLoading,
    error,
    refetch,
  } = useQuery<ApiResponse<(Location | Creator)[]> & DocumentMeta>({
    queryKey: [filterType],
    queryFn: () => {
      return filterType === Filters.creators
        ? apiService.getCreators()
        : apiService.getLocations();
    },
    enabled: !!useAuth().token,
  });

  return { filterOptions, error, isLoading, refetch };
};
