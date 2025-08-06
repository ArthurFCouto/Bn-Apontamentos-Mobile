import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Chip,
  Divider,
  List,
  Surface,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { useDataApp } from "../../hooks/useDataApp";
import { useNetwork } from "../../hooks/useNetwork";
import { useSync } from "../../hooks/useSync";

const StatusApp = () => {
  const [simulate, setSimulate] = useState(false);
  const { colors, fonts } = useTheme();
  const { pendingCount, hasPending, performManualSync, isSyncing } = useSync();
  const { cutPlans, segments } = useDataApp();
  const { hasConnection, setSimulateOffline } = useNetwork();

  const onToggleSwitch = () => {
    setSimulate((prev) => !prev);
    setSimulateOffline((prev) => !prev);
  };

  const IconSync: IconSource = (props) => (
    <MaterialIcons name="sync" size={props.size} color={props.color} />
  );

  return (
    <View style={styles.container}>
      <Surface style={[styles.header, { backgroundColor: colors.background }]}>
        <MaterialIcons
          name="perm-device-info"
          size={fonts.displayMedium.fontSize}
          color="black"
        />
        <View style={{ marginLeft: 10, paddingVertical: 5 }}>
          <Text variant="headlineSmall">Resumo do App</Text>
          <Text variant="bodyLarge">Status dos apontamentos e do App</Text>
        </View>
      </Surface>
      <View style={styles.contents}>
        <List.Item
          title="Conexão com internet"
          left={(props) => (
            <MaterialIcons
              {...props}
              name={hasConnection ? "wifi" : "wifi-off"}
            />
          )}
          right={() => <Chip>{hasConnection ? "Online" : "Offline"}</Chip>}
        />
        <List.Item
          title="Itens pendentes de sincronização"
          left={(props) => (
            <MaterialIcons
              {...props}
              name={
                hasPending ? "radio-button-unchecked" : "check-circle-outline"
              }
            />
          )}
          right={() => <Chip>{pendingCount}</Chip>}
        />
        <List.Item
          title="Planos de corte carregados"
          left={(props) => <MaterialIcons {...props} name={"assignment"} />}
          right={() => <Chip>{cutPlans.length}</Chip>}
        />
        <List.Item
          title="Trechos carregados"
          left={(props) => <MaterialIcons {...props} name={"assignment-add"} />}
          right={() => <Chip>{segments.length}</Chip>}
        />
        <Divider />
        <View style={styles.bottom}>
          <List.Item
            title="Sincronizar itens pendentes"
            left={(props) => <MaterialIcons {...props} name={"cloud-upload"} />}
            right={() => (
              <Button
                compact
                disabled={pendingCount == 0}
                mode="contained"
                icon={IconSync}
                loading={isSyncing}
                onPress={() => performManualSync()}
              >
                Enviar
              </Button>
            )}
          />
          <List.Item
            title="Simular cenário offline"
            left={(props) => (
              <MaterialIcons {...props} name={"tips-and-updates"} />
            )}
            right={() => (
              <Switch value={simulate} onValueChange={onToggleSwitch} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default StatusApp;

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
    marginTop: 15,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
