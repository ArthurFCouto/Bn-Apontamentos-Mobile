import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Modal, Text, useTheme } from "react-native-paper";
import { MultiSelectDropdown, Option } from "react-native-paper-dropdown";
import { cutClient } from "../../clients/cutPlane";
import CutPlanCard from "../../components/dashboard/cutPlanCard";
import Header from "../../components/dashboard/header";
import LineButtons from "../../components/dashboard/lineButtons";
import WifiOffAlert from "../../components/shared/wifiOffAlert";
import { useAuth } from "../../hooks/useAuth";
import { useDataApp } from "../../hooks/useDataApp";
import { CutPlan } from "../../types/cutPlan";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [cutPlanes, setCutPlanes] = useState<CutPlan[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<Option[]>([]);
  const [optionsSelected, setOptionsSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();
  const { isOldCutPlan, updateDataApp } = useDataApp();
  const { setStatus } = useAuth();

  const getCutPlanes = async () => {
    setIsLoading(true);
    const { data, status } = await cutClient.getAll();
    setIsLoading(false);

    if (data) {
      setCutPlanes(data);
      setDropdownOptions(
        data.map((x) => {
          return { label: x.nome, value: x.id.toString() };
        })
      );
      if (isOldCutPlan) setShowModal(true);

      return;
    }
    if (status === 401) {
      setStatus("unauth");
      return;
    }
  };

  const updateCutPlanes = async () => {
    setShowModal(false);
    if (optionsSelected.length === 0) return;

    setIsLoading(true);
    const cutPlanesToContext = cutPlanes.filter((x) =>
      optionsSelected.includes(x.id.toString())
    );
    await updateDataApp(cutPlanesToContext);
    setIsLoading(false);
  };

  const handleSelectCutPlane = (values: string[]) => {
    setOptionsSelected(values);
  };

  const handleNewLoad = async () => {
    await getCutPlanes();
    setShowModal(true);
  };

  const MUIModal = () => (
    <Modal
      visible={showModal}
      onDismiss={() => setShowModal(false)}
      contentContainerStyle={[
        styles.modal,
        { backgroundColor: colors.background },
      ]}
    >
      <Text variant="titleLarge">Carregar Plano de Corte</Text>
      <Text variant="titleSmall">
        Selecione os planos de corte que serão apontados
      </Text>
      <MultiSelectDropdown
        label="Selecionar"
        options={dropdownOptions}
        value={optionsSelected}
        onSelect={handleSelectCutPlane}
        mode="outlined"
        disabled={isLoading}
      />
      <Button
        mode="contained"
        onPress={updateCutPlanes}
        style={styles.modalButton}
      >
        Ok
      </Button>
    </Modal>
  );

  useEffect(() => {
    getCutPlanes();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contents}>
        <CutPlanCard isLoading={isLoading} onLoad={handleNewLoad} />
        <LineButtons />
        <View style={styles.containerImg}>
          <Image
            source={require("../../../assets/splash-icon.png")}
            style={styles.img}
            resizeMode="contain"
          />
        </View>
        <WifiOffAlert />
      </View>
      <MUIModal />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 10,
    gap: 15,
  },
  modalButton: {
    marginTop: 15,
  },
  container: {
    flex: 1,
  },
  contents: {
    flex: 1,
    gap: 15,
    padding: 10,
  },
  containerImg: {
    flex: 1,
    justifyContent: "center",
  },
  img: {
    alignSelf: "center",
    width: "50%",
    maxHeight: 100,
  },
});
