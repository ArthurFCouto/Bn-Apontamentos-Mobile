import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Surface, Text } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { authClient } from "../../clients/auth";
import { useAuth } from "../../hooks/useAuth";

export default function Account() {
  const { user, setStatus } = useAuth();

  const SignOut = async () => {
    await authClient.signOut();
    setStatus("unauth");
  };

  const Icon: IconSource = (props) => (
    <FontAwesome name="user" size={props.size} color={props.color} />
  );

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <View style={styles.header}>
          <Avatar.Icon size={70} icon={Icon} />
          <View style={styles.headerContent}>
            <Text variant="headlineLarge">{user?.nome}</Text>
            <Text variant="titleLarge">{user?.matricula}</Text>
          </View>
        </View>
      </Surface>
      <View style={styles.body}>
        <Button mode="contained" onPress={SignOut}>
          Sair
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  headerContent: {
    marginLeft: 10,
    justifyContent: "center",
  },
  body: {
    flex: 1,
    padding: 10,
    marginTop: 15,
    justifyContent: "flex-end",
  },
});
