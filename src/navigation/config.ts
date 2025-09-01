export enum DocumentTypes {
  purchaseRequisitions = "purchaserequisitions",
  purchaseOrders = "purchaseorders",
}

export type DocumentTypesStrings = `${DocumentTypes}`;

export enum OrdersScreens {
  ORDERS_STACK = "Orders stack entry",
  ORDERS_LIST = "List of orders",
  ORDERS_CREATE = "Create new order",
}

export enum RequisitsScreens {
  REQUISITS_STACK = "Requisits stack entry",
  REQUISIT_LIST = "List of requisits",
  REQUISIT_CREATE = "Create new requisit",
}

export enum TabsScreens {
  HOME = "Home",
  DOCUMENTS = "Documents",
}

export interface DocumentsListStackParams {
  documentType: DocumentTypesStrings;
  parentNavigator?: string;
  nextScreen?: string;
}
