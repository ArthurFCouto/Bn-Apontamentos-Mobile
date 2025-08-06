import { useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Snackbar, useTheme } from "react-native-paper";
import { authClient } from "../../clients/auth";
import Form, { SignInSchema } from "../../components/signIn/form";
import { useAuth } from "../../hooks/useAuth";

export default function SignIn() {
  const { colors } = useTheme();
  const { setStatus, checkAuthStatus } = useAuth();
  const [showSnack, setShowSnack] = useState({
    open: false,
    message: "",
  });

  const onSubmit = async (data: SignInSchema) => {
    Keyboard.dismiss();
    const { user, error } = await authClient.signInWithPassword(data);

    if (user) {
      checkAuthStatus?.();
      setStatus("auth");
      return;
    }

    setShowSnack({
      open: true,
      message: error ?? "Tente novamente",
    });
  };

  const MUISnackbar = () => (
    <Snackbar
      duration={3000}
      visible={showSnack.open}
      onDismiss={() => setShowSnack({ ...showSnack, open: false })}
      action={{
        label: "Fechar",
        onPress: () => setShowSnack({ ...showSnack, open: false }),
      }}
    >
      {showSnack.message}
    </Snackbar>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.main}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.main}>
          <ImageBackground
            source={require("../../assets/background.jpg")}
            style={styles.main}
          >
            <View style={styles.container}>
              <View style={styles.containerImg}>
                <Image
                  source={require("../../../assets/splash-icon.png")}
                  style={styles.img}
                  resizeMode="contain"
                />
              </View>
              <Form
                onSubmit={onSubmit}
                onError={(data) => setShowSnack({ open: true, message: data })}
              />
              <MUISnackbar />
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  containerImg: {
    height: "30%",
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    justifyContent: "center",
  },
  img: {
    alignSelf: "center",
    width: "35%",
    maxHeight: 70,
  },
});
