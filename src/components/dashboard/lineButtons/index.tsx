import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, ViewProps } from "react-native";
import { Surface, TouchableRipple, useTheme } from "react-native-paper";
import { authClient } from "../../../clients/auth";
import { useAuth } from "../../../hooks/useAuth";

const LineButtons: React.FC<ViewProps> = (props) => {
  const navigation = useNavigation();
  const { setStatus } = useAuth();
  const { fonts, colors } = useTheme();
  const rippleColor = "rgba(0, 0, 0, .2)";

  const goToRegister = () =>
    navigation.navigate("App", {
      screen: "RecordStack",
      params: {
        screen: "Register",
      },
    });

  const goToRecords = () =>
    navigation.navigate("App", {
      screen: "RecordStack",
      params: {
        screen: "InstallRecord",
      },
    });

  const handleSignOut = async () => {
    await authClient.signOut();
    setStatus("unauth");
  };

  return (
    <View style={[props.style, styles.container]}>
      <Surface style={styles.surface}>
        <View style={styles.view}>
          <TouchableRipple
            onPress={goToRegister}
            rippleColor={rippleColor}
            style={styles.touch}
          >
            <FontAwesome
              name="plus-circle"
              size={fonts.headlineLarge.fontSize}
              color={colors.primary}
            />
          </TouchableRipple>
        </View>
      </Surface>
      <Surface style={styles.surface}>
        <View style={styles.view}>
          <TouchableRipple
            onPress={goToRecords}
            rippleColor={rippleColor}
            style={styles.touch}
          >
            <FontAwesome
              name="list-ul"
              size={fonts.headlineLarge.fontSize}
              color={colors.primary}
            />
          </TouchableRipple>
        </View>
      </Surface>
      <Surface style={styles.surface}>
        <View style={styles.view}>
          <TouchableRipple
            onPress={handleSignOut}
            rippleColor={rippleColor}
            style={styles.touch}
          >
            <FontAwesome
              name="user-times"
              size={fonts.headlineLarge.fontSize}
              color={colors.primary}
            />
          </TouchableRipple>
        </View>
      </Surface>
    </View>
  );
};

export default LineButtons;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  surface: {
    borderRadius: 20,
  },
  view: {
    borderRadius: 20,
    overflow: "hidden",
  },
  touch: {
    alignItems: "center",
    height: 80,
    justifyContent: "center",
    width: 80,
  },
});
