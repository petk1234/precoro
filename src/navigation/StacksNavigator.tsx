import { createStackNavigator } from "@react-navigation/stack";
import {
  DocumentTypes,
  OrdersScreens,
  RequisitsScreens,
  TabsScreens,
} from "./config";
import { DocumentsScreen } from "../screens/DocumentsScreen/index";
import { CreateDocumentScreen } from "../screens/CreateDocumentScreen";
import AllDocumentsScreen from "../screens/AllDocumentsScreen";

const Stack = createStackNavigator();

export const OrdersStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={OrdersScreens.ORDERS_LIST}
        children={(props) => (
          <DocumentsScreen
            {...props}
            documentType={DocumentTypes.purchaseOrders}
            parentNavigator={OrdersScreens.ORDERS_STACK}
            nextScreen={OrdersScreens.ORDERS_CREATE}
          />
        )}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={OrdersScreens.ORDERS_CREATE}
        children={(props) => (
          <CreateDocumentScreen
            {...props}
            documentType={DocumentTypes.purchaseOrders}
          />
        )}
      />
    </Stack.Navigator>
  );
};

export const RequisitsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={RequisitsScreens.REQUISIT_LIST}
        children={(props) => (
          <DocumentsScreen
            {...props}
            documentType={DocumentTypes.purchaseRequisitions}
            parentNavigator={RequisitsScreens.REQUISITS_STACK}
            nextScreen={RequisitsScreens.REQUISIT_CREATE}
          />
        )}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={RequisitsScreens.REQUISIT_CREATE}
        children={(props) => (
          <CreateDocumentScreen
            {...props}
            documentType={DocumentTypes.purchaseRequisitions}
          />
        )}
      />
    </Stack.Navigator>
  );
};

export const DocumentsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={TabsScreens.DOCUMENTS}
        component={AllDocumentsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={RequisitsScreens.REQUISITS_STACK}
        component={RequisitsStackNavigator}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={OrdersScreens.ORDERS_STACK}
        component={OrdersStackNavigator}
      />
    </Stack.Navigator>
  );
};
