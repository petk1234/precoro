import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";
import styles from "./styles";
import { COLORS } from "../../theme/colors";
import Header from "../../components/Header/index";
import { UserProfile } from "../../../assets";

const Home = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient style={styles.screen} colors={[COLORS.main.bg.gradient1, COLORS.main.bg.gradient2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Header title='Home' renderRightButton={<UserProfile />} />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
