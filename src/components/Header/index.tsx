import { Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";

interface Props {
  renderLeftButton?: React.ReactNode;
  renderRightButton?: React.ReactNode;
  title: string;
  customStyles?: Object;
}

const Header = ({
  renderLeftButton,
  renderRightButton,
  title,
  customStyles,
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        {renderLeftButton ? renderLeftButton : <View style={styles.leftItem} />}
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
