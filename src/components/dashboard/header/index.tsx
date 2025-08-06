import { StyleSheet, View } from "react-native";
import { Avatar, Surface, Text, useTheme } from "react-native-paper";
import { useAuth } from "../../../hooks/useAuth";

const Header = () => {
  const { fonts, colors } = useTheme();
  const { user } = useAuth();

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <Avatar.Icon icon={"account"} size={fonts.displayMedium.fontSize} />
      <View style={{ marginLeft: 10, paddingVertical: 5 }}>
        <Text variant="headlineSmall">{user?.nome}</Text>
        <Text variant="bodyLarge">{user?.matricula}</Text>
      </View>
    </Surface>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row",
    padding: 10,
  },
});
