import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Document } from "../../types";
import { DocumentCard } from "./components/DocumentCard";
import { StatusesBar } from "./components/StatusesBar";
import Header from "../../components/Header/index";
import { Filters, Plus } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { DocumentsListStackParams } from "../../navigation/config";
import styles from "./styles";
import { useDocumentsQuery } from "../../services/queries/useDocumentsQuery";
import { CustomBottomSheet } from "../../components/CustomBottomSheet";
import GeneralFilters from "./components/FiltersBottomSheet/components/GeneralFilters";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import RoundedButton from "../../components/RoundedButton";

export const DocumentsScreen = ({
  documentType,
  parentNavigator,
  nextScreen,
  title,
}: DocumentsListStackParams) => {
  const navigation = useNavigation<any>();
  const [showFiltersSheet, setShowFiltersSheet] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [accumulatedDocuments, setAccumulatedDocuments] = useState<Document[]>(
    []
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const flatListRef = useRef(null);

  const { filters, documents, error, updateFilters, refetch } =
    useDocumentsQuery(documentType);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handlePagination = async () => {
    if (documents?.meta.pagination.hasNextPage) {
      updateFilters({ page: filters.page + 1 });
    }
  };

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  useEffect(() => {
    if (!error && documents?.data) {
      if (filters.page > 1) {
        setAccumulatedDocuments([...accumulatedDocuments, ...documents.data]);
      } else {
        setAccumulatedDocuments(documents.data);
        scrollToTop();
      }
    }
  }, [documents?.data]);

  useEffect(() => {
    if (showFiltersSheet) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [showFiltersSheet]);

  const renderFooter = () => (
    <View style={styles.filterSearch}>
      <View style={{ width: "100%", height: "50%" }}>
        <RoundedButton
          onPress={() => {
            updateFilters({ optionsChoosed: false });
            setTimeout(() => setShowFiltersSheet(false), 500);
          }}
        >
          Filter
        </RoundedButton>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={title}
        goBack
        renderRightButton={
          <TouchableOpacity
            onPress={() => {
              setShowFiltersSheet(true);
            }}
          >
            <Filters />
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <StatusesBar />

        <FlatList
          ref={flatListRef}
          data={accumulatedDocuments}
          keyExtractor={(item) => item.idn}
          renderItem={({ item }) => (
            <DocumentCard key={item.idn} document={item} />
          )}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handlePagination}
        />

        {!showFiltersSheet && (
          <TouchableOpacity
            style={styles.fab}
            onPress={() =>
              navigation.navigate(parentNavigator, { screen: nextScreen })
            }
          >
            <Plus />
          </TouchableOpacity>
        )}
      </View>
      <CustomBottomSheet
        isVisible={showFiltersSheet}
        ref={bottomSheetRef}
        onClose={() => {
          updateFilters({ optionsChoosed: null });
          setShowFiltersSheet(false);
        }}
        footer={filters.optionsChoosed && renderFooter()}
      >
        <GeneralFilters />
      </CustomBottomSheet>
    </SafeAreaView>
  );
};
