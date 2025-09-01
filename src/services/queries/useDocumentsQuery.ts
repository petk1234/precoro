import { useQuery } from "@tanstack/react-query";
import { useFilters } from "../../contexts/FiltersContext";
import { DocumentFilters, DocumentStatus } from "../../types";
import { DocumentTypes } from "../../navigation/config";
import { apiService } from "../api";
import { useAuth } from "../../contexts/AuthContext";

export const useDocumentsQuery = (documentType: `${DocumentTypes}`) => {
  const { filters, updateFilters } = useFilters();

  const combinedFilters: DocumentFilters = {
    status:
      filters.statuses.length > 0 && filters.statuses[0] !== DocumentStatus.ALL
        ? filters.statuses
        : undefined,
    location: filters.locations.length > 0 ? filters.locations : undefined,
    creator: filters.creators.length > 0 ? filters.creators : undefined,
    page: filters.page || 1,
  };

  const {
    data: documents,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [documentType, combinedFilters],
    queryFn: () => {
      if (documentType === DocumentTypes.purchaseOrders) {
        return apiService.getPurchaseOrders(combinedFilters);
      } else {
        return apiService.getPurchaseRequisitions(combinedFilters);
      }
    },
    enabled: !!useAuth().token,
  });
  console.log("filters.optionsChoosed", filters.optionsChoosed);
  return { filters, documents, error, isLoading, updateFilters, refetch };
};
