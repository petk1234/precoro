import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentTypesStrings } from "../../navigation/config";
import { CreateDocumentRequest } from "../../types";
import { apiService } from "../api";
import { Alert } from "react-native";

export const useCreateDocumentCreation = (
  documentType: DocumentTypesStrings,
  onSuccess: () => void
) => {
  const queryClient = useQueryClient();
  const createDocumentMutation = useMutation({
    mutationFn: (data: CreateDocumentRequest) => {
      if (documentType === "purchaseorders") {
        return apiService.createPurchaseOrder(data);
      } else {
        return apiService.createPurchaseRequisition(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [documentType] });
      onSuccess();
    },
    onError: () => {
      Alert.alert("Error", "Please try again");
    },
  });
  return createDocumentMutation;
};
