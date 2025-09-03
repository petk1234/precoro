import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header/index";
import { Orders, Requisitions, UserProfile } from "../../../assets";
import { View } from "react-native";
import ListItem from "../../components/ListItem";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../theme/colors";
import styles from "./styles";
import { OrdersScreens, RequisitsScreens } from "../../navigation/config";

const AllDocumentsScreen = () => {
  const navigation = useNavigation<any>();

  const navigateToOrders = () =>
    navigation.navigate(OrdersScreens.ORDERS_STACK, OrdersScreens.ORDERS_LIST);
  const navigateToRequisits = () =>
    navigation.navigate(
      RequisitsScreens.REQUISITS_STACK,
      RequisitsScreens.REQUISIT_LIST
    );

  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient
        style={styles.screen}
        colors={[COLORS.main.bg.gradient1, COLORS.main.bg.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Header title='Documents' renderRightButton={<UserProfile />} />
        <View style={styles.list}>
          <ListItem
            icon={<Requisitions />}
            onPress={navigateToRequisits}
            title='Purchase Requisitions'
          />
          <ListItem
            icon={<Orders />}
            onPress={navigateToOrders}
            title='Purchase Orders'
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AllDocumentsScreen;
