export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Location {
  id: number;
  name: string;
}

export interface Creator {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
  parent: { id: number | null } | null;
}

export type DepartmentTreeNode = Department & {
  children?: DepartmentTreeNode[];
};

export interface NestedTreeNode {
  children: NestedTreeNode[];
  id: number;
  name: string;
}

export interface Document {
  idn: string;
  sum: number;
  status: DocumentStatus;
  location: Location;
  date: string;
  currency: string;
  creator: Creator;
  createdAt: string;
  updatedAt: string;
  department: Department;
}

export enum DocumentStatus {
  DRAFT = 0,
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
  CANCELLED = 4,
  ALL = -999,
}

export interface DocumentFilters {
  status?: DocumentStatus[];
  location?: number[];
  creator?: number[];
  page?: number;
}

export interface CreateDocumentRequest {
  deliveryDate: string;
  location: number;
  department: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface DocumentMeta {
  meta: { pagination: { page: number; hasNextPage: boolean } };
}

export enum Statuses {
  approved = "Approved",
  pending = "Pending",
  rejected = "Rejected",
  draft = "Draft",
  cancelled = "Cancelled",
  all = "All",
}

export enum Filters {
  status = "Status",
  locations = "Locations",
  creators = "Creators",
}

export const filterToContextMapper: Record<
  string,
  "statuses" | "locations" | "creators"
> = {
  [Filters.status]: "statuses",
  [Filters.locations]: "locations",
  [Filters.creators]: "creators",
};

export interface Option {
  id: number;
  value: string;
}
