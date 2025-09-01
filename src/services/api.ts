import { AuthResponse, Document, Location, Creator, DocumentFilters, CreateDocumentRequest, ApiResponse, DocumentMeta, Department, DepartmentTreeNode } from "../types";

const BASE_URL = "https://precoro-react-native-test-task-api.avramch.workers.dev";

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["X-Auth-Token"] = this.token;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // Documents
  async getPurchaseOrders(filters?: DocumentFilters): Promise<ApiResponse<Document[]> & DocumentMeta> {
    const queryParams = this.buildQueryParams(filters);
    return this.request<ApiResponse<Document[]> & DocumentMeta>(`/api/purchaseorders${queryParams}`);
  }

  async getPurchaseRequisitions(filters?: DocumentFilters): Promise<ApiResponse<Document[]> & DocumentMeta> {
    const queryParams = this.buildQueryParams(filters);
    return this.request<ApiResponse<Document[]> & DocumentMeta>(`/api/purchaserequisitions${queryParams}`);
  }

  async createPurchaseOrder(data: CreateDocumentRequest): Promise<Document> {
    return this.request<Document>("/api/purchaseorders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async createPurchaseRequisition(data: CreateDocumentRequest): Promise<Document> {
    return this.request<Document>("/api/purchaserequisitions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Filters
  async getLocations(): Promise<ApiResponse<Location[]> & DocumentMeta> {
    return this.request<ApiResponse<Location[]> & DocumentMeta>("/api/locations");
  }

  async getCreators(): Promise<ApiResponse<Creator[]> & DocumentMeta> {
    return this.request<ApiResponse<Creator[]> & DocumentMeta>("/api/creators");
  }

  async getDepartments(): Promise<ApiResponse<Department[]>> {
    return this.request<ApiResponse<Department[]>>("/api/departments");
  }

  private buildQueryParams(filters?: DocumentFilters): string {
    if (!filters) return "";

    const params = new URLSearchParams();

    if (filters.status && filters.status.length > 0) {
      filters.status.forEach((status) => params.append("status", status.toString()));
    }

    if (filters.location && filters.location.length > 0) {
      filters.location.forEach((location) => params.append("location", location.toString()));
    }

    if (filters.creator && filters.creator.length > 0) {
      filters.creator.forEach((creator) => params.append("creator", creator.toString()));
    }

    if (filters.page && filters.page > 0) {
      params.append("page", filters.page.toString());
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }
}

export const apiService = new ApiService();

export const buildDepartmentTree = (flat: Department[]): DepartmentTreeNode[] => {
  const map = new Map<number, DepartmentTreeNode>();
  const roots: DepartmentTreeNode[] = [];

  flat.forEach((d) => map.set(d.id, { ...d, children: [] }));

  flat.forEach((d) => {
    const node = map.get(d.id)!;
    const parentId = d.parent?.id ?? null;
    if (parentId === null) {
      roots.push(node);
    } else {
      const parent = map.get(parentId);
      if (parent) parent.children = [...(parent.children || []), node];
      else roots.push(node); // fallback if parent missing
    }
  });

  return roots;
};
