import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";
import { Back } from "../../../assets";
import { COLORS } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";

interface Props {
  renderLeftButton?: React.ReactNode;
  renderRightButton?: React.ReactNode;
  title: string;
  customStyles?: Object;
  goBack?: boolean;
}

const Header = ({
  renderLeftButton,
  renderRightButton,
  title,
  customStyles,
  goBack,
}: Props) => {
  const navigation = useNavigation();
  const renderGoBack = () => (
    <TouchableOpacity onPress={navigation.goBack}>
      {" "}
      <Back fill={COLORS.elements.active} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={styles.leftItem}>
          {renderLeftButton || (goBack && renderGoBack())}
        </View>
      </TouchableWithoutFeedback>
      <Text style={[styles.title, customStyles && customStyles]}>{title}</Text>
      <TouchableWithoutFeedback>
        {renderRightButton ? (
          renderRightButton
        ) : (
          <View style={styles.rightItem} />
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Header;
