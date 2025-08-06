import { Image, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/splash-icon.png")}
        resizeMode="contain"
        style={styles.img}
      />
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "45%",
    maxHeight: 100,
  },
});
