import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Avatar,
  Divider,
  Snackbar,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { installRecordClient } from "../../clients/installRecord";
import DropdownView from "../../components/register/dropdowView";
import RecordForm, {
  RecordFormSubmitData,
} from "../../components/register/recordForm";
import SegmentDetails from "../../components/register/segmentDetails";
import Alert from "../../components/shared/alert";
import WifiOffAlert from "../../components/shared/wifiOffAlert";
import { useAuth } from "../../hooks/useAuth";
import { useDataApp } from "../../hooks/useDataApp";
import { useNetwork } from "../../hooks/useNetwork";
import {
  OfflineStorageService,
  pendingRegisterKeys,
} from "../../services/offlineStorage";
import { Segment } from "../../types/segment";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [planeIdSelected, setPlaneIdSelected] = useState("");
  const [segmentIdSelected, setSegmentIdSelected] = useState("");
  const [segmentInfo, setSegmentInfo] = useState<Segment>();
  const [showSnack, setShowSnack] = useState({
    open: false,
    message: "",
  });
  const navigation = useNavigation();
  const { colors, fonts } = useTheme();
  const { user, setStatus } = useAuth();
  const { cutPlans, segments } = useDataApp();
  const { hasConnection } = useNetwork();

  const onSelectPlane = (value: any) => {
    setPlaneIdSelected(value);
  };

  const onSelectSegment = (value: any) => {
    setSegmentIdSelected(value);
    const segment = segments.find((x) => x.idTrecho.toString() === value);
    setSegmentInfo(segment);
  };

  const onClearBoth = () => {
    setPlaneIdSelected("");
    setSegmentIdSelected("");
    setSegmentInfo(undefined);
  };

  const simulateOfflineOnSubmit = async (data: RecordFormSubmitData) => {
    const offlineService = new OfflineStorageService(
      pendingRegisterKeys.INSTALL_RECORD
    );
    setIsLoading(true);
    try {
      await offlineService.savePendingRegister(data);
      setShowSnack({ open: true, message: "Apontamento salvo offline." });
      onClearBoth();
    } catch (offlineError) {
      setShowSnack({
        open: true,
        message: `Erro ao salvar apontamento offline: ${offlineError}`,
      });
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: RecordFormSubmitData) => {
    if (isLoading) return;

    const request = {
      idTrecho: Number(segmentIdSelected),
      matriculaUsuario: Number(user?.matricula),
      tagReal: data.tagReal,
      metragemInicio: data.metragemInicio,
      metragemFim: data.metragemFim,
      observacao: data.observacao?.trim(),
      dataLancamento: data.dataLancamento,
    };

    if (!hasConnection) {
      return await simulateOfflineOnSubmit(request);
    }

    setIsLoading(true);
    const { error, status, savedOffline } = await installRecordClient.create(
      request
    );
    setIsLoading(false);

    if (status === 401) {
      setStatus("unauth");
      return;
    } else if (error) {
      if (savedOffline) {
        onClearBoth();
      }
      setShowSnack({ open: true, message: error });
      return;
    }

    setShowSnack({
      open: true,
      message: "Registro efetuado com sucesso.",
    });
    onClearBoth();
  };

  const goToRecords = () =>
    navigation.navigate("App", {
      screen: "RecordStack",
      params: {
        screen: "InstallRecord",
      },
    });

  const Header = () => (
    <Surface style={[styles.header, { backgroundColor: colors.background }]}>
      <TouchableRipple onPress={goToRecords}>
        <Avatar.Icon icon="arrow-left" size={fonts.displayMedium.fontSize} />
      </TouchableRipple>
      <View style={{ marginLeft: 10, paddingVertical: 5 }}>
        <Text variant="headlineSmall">Registrar Apontamento</Text>
        <Text variant="bodyLarge">Registrar novo apontamento</Text>
      </View>
    </Surface>
  );

  const onDismissSnackBar = () => {
    setShowSnack((prev) => {
      return { ...prev, open: false };
    });
  };

  const MUISnackbar = () => (
    <Snackbar
      visible={showSnack.open}
      onDismiss={onDismissSnackBar}
      action={{
        label: "Fechar",
        onPress: onDismissSnackBar,
      }}
    >
      {showSnack.message}
    </Snackbar>
  );

  const bothSelected =
    planeIdSelected.length === 0 ||
    segmentIdSelected.length === 0 ||
    !segmentInfo;

  useFocusEffect(
    useCallback(() => {
      return () => onClearBoth();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />
          <View style={styles.contents}>
            <WifiOffAlert />
            {cutPlans.length === 0 && (
              <Alert message="Favor selecionar o(s) plano(s) de corte na tela inicial para lançamento." />
            )}
            <DropdownView
              segmentValueSelected={segmentIdSelected}
              planeValueSelected={planeIdSelected}
              onSelectSegment={onSelectSegment}
              onSelectPlane={onSelectPlane}
              onClearSelection={onClearBoth}
            />
            <SegmentDetails information={segmentInfo} />
            <Divider style={styles.divider} />
            <RecordForm
              isLoading={isLoading}
              submit={onSubmit}
              isDisabled={bothSelected}
            />
            <MUISnackbar />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    gap: 10,
    padding: 10,
  },
  divider: {
    marginVertical: 10,
  },
});
