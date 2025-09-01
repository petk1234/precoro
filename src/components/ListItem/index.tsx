import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

const ListItem = ({ icon, title, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {icon}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
