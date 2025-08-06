import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Snackbar, Surface, Text, useTheme } from "react-native-paper";
import { installRecordClient } from "../../clients/installRecord";
import RecordsTable from "../../components/installRecord/noteTable";
import { useAuth } from "../../hooks/useAuth";
import { InstallRecord } from "../../types/installRecord";

export default function RecordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [notations, setNotations] = useState<InstallRecord[]>([]);
  const [showSnack, setShowSnack] = useState({
    open: false,
    message: "",
  });
  const { colors, fonts } = useTheme();
  const { setStatus } = useAuth();
  const navigation = useNavigation();

  const handleUpdate = async () => {
    if (isLoading) return;

    setNotations([]);
    setIsLoading(true);
    const { data, error, status } = await installRecordClient.getAll(1, 100);
    setIsLoading(false);

    if (status === 401) {
      setStatus("unauth");
      return;
    } else if (data) {
      setNotations(data.registros);
      return;
    }

    setShowSnack({ open: true, message: error ?? "Erro inesperado." });
  };

  const NavigateToRegister = () =>
    navigation.navigate("App", {
      screen: "RecordStack",
      params: {
        screen: "Register",
      },
    });

  const ButtonsLine = () => (
    <View style={styles.buttons}>
      <Button
        icon={(props) => (
          <MaterialIcons
            name="filter-alt"
            size={props.size}
            color={props.color}
          />
        )}
        mode="contained"
        disabled
      >
        Filtrar
      </Button>
      <Button
        icon={(props) => (
          <MaterialIcons name="update" size={props.size} color={props.color} />
        )}
        mode="contained"
        onPress={handleUpdate}
        loading={isLoading}
      >
        Atualizar
      </Button>
    </View>
  );

  const MUISnackbar = () => (
    <Snackbar
      duration={2000}
      visible={showSnack.open}
      onDismiss={() => setShowSnack({ ...showSnack, open: false })}
      action={{
        label: "Fechar",
        onPress: () => setShowSnack({ ...showSnack, open: false }),
      }}
      style={{ backgroundColor: colors.errorContainer }}
    >
      {showSnack.message}
    </Snackbar>
  );

  return (
    <View style={styles.container}>
      <Surface style={[styles.header, { backgroundColor: colors.background }]}>
        <MaterialIcons
          name="app-registration"
          size={fonts.displaySmall.fontSize}
        />
        <View style={{ marginLeft: 10, paddingVertical: 5 }}>
          <Text variant="headlineSmall">Apontamentos</Text>
          <Text variant="bodyLarge">Acompanhe o registro dos apontamentos</Text>
        </View>
      </Surface>
      <View style={styles.contents}>
        <ButtonsLine />
        <ScrollView horizontal>
          <RecordsTable records={notations} />
        </ScrollView>
        <Button
          icon={(props) => (
            <MaterialIcons
              name="add-box"
              size={props.size}
              color={props.color}
            />
          )}
          mode="contained"
          onPress={NavigateToRegister}
          style={{ marginTop: 10 }}
        >
          Novo
        </Button>
      </View>
      <MUISnackbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row",
    padding: 10,
  },
  contents: {
    flex: 1,
    marginTop: 5,
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 5,
  },
});
