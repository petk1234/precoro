import React, { createContext, useContext, useState, ReactNode } from "react";
import { DocumentStatus } from "../types";

export interface FilterState {
  statuses: DocumentStatus[];
  locations: number[];
  creators: number[];
  page: number;
  optionsChoosed: boolean | null;
}

interface FiltersContextType {
  filters: FilterState;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [filters, setFilters] = useState<FilterState>({
    statuses: [],
    locations: [],
    creators: [],
    page: 1,
    optionsChoosed: null,
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const clearFilters = () => {
    setFilters({
      statuses: [],
      locations: [],
      creators: [],
      page: 1,
      optionsChoosed: false,
    });
  };

  const hasActiveFilters =
    filters.statuses.length > 0 ||
    filters.locations.length > 0 ||
    filters.creators.length > 0;

  const value: FiltersContextType = {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
