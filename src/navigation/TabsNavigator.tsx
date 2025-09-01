import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/colors";
import { OrdersScreens, TabsScreens } from "./config";
import Home from "../screens/Home";
import { DocumentsTab, HomeTab } from "../../assets";
import { DocumentsStackNavigator } from "./StacksNavigator";

const Tab = createBottomTabNavigator();

const DocumentsTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.elements.active,
        tabBarInactiveTintColor: COLORS.elements.inactive,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: COLORS.borders.primary,
          height: 84,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={TabsScreens.HOME}
        component={Home}
        options={{
          title: TabsScreens.HOME,
          tabBarLabel: TabsScreens.HOME,
          tabBarIcon: ({ focused }) => {
            const color = focused
              ? COLORS.elements.active
              : COLORS.elements.inactive;
            return <HomeTab fill={color} />;
          },
          tabBarActiveTintColor: COLORS.elements.active,
          tabBarInactiveTintColor: COLORS.elements.inactive,
        }}
      />
      <Tab.Screen
        name={TabsScreens.DOCUMENTS}
        component={DocumentsStackNavigator}
        options={{
          title: TabsScreens.DOCUMENTS,
          tabBarLabel: TabsScreens.DOCUMENTS,
          tabBarIcon: ({ focused }) => {
            const color = focused
              ? COLORS.elements.active
              : COLORS.elements.inactive;
            return <DocumentsTab fill={color} />;
          },
          tabBarActiveTintColor: COLORS.elements.active,
          tabBarInactiveTintColor: COLORS.elements.inactive,
        }}
      />
    </Tab.Navigator>
  );
};

export default DocumentsTabNavigator;
