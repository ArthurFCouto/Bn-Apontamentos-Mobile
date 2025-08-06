import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useDataApp } from "../../../hooks/useDataApp";

interface Options {
  label: string;
  value: string;
}

interface DropdownViewProps {
  planeValueSelected: string;
  onSelectPlane: (value?: string) => void;
  segmentValueSelected: string;
  onSelectSegment: (value?: string) => void;
  onClearSelection: () => void;
}

const DropdownView = ({
  planeValueSelected,
  onSelectPlane,
  segmentValueSelected,
  onSelectSegment: onSelectCable,
  onClearSelection,
}: DropdownViewProps) => {
  const [planeOptions, setPlaneOptions] = useState<Options[]>([]);
  const [cableIdentifications, setCableIdentifications] = useState<Options[]>(
    []
  );
  const { cutPlans, segments } = useDataApp();
  const bothSelected =
    planeValueSelected.length > 0 && segmentValueSelected.length > 0;

  const onChangePlane = (value?: string) => {
    onSelectPlane(value);

    if (segments.length === 0) {
      return;
    }

    const cablesOption = segments
      .filter((segment) => segment.idPlanoDeCorte.toString() === value)
      .map((segment) => {
        return {
          label: segment.identificacaoCabo,
          value: segment.idTrecho.toString(),
        };
      });
    setCableIdentifications(cablesOption);
  };

  useEffect(() => {
    if (cutPlans.length > 0) {
      setPlaneOptions(
        cutPlans.map((p) => {
          return { label: p.nome, value: p.id.toString() };
        })
      );
    }
  }, [cutPlans]);

  return (
    <View style={styles.container}>
      <Dropdown
        disabled={planeOptions.length === 0 || bothSelected}
        label={"Plano de Corte"}
        placeholder="Selecione"
        options={planeOptions}
        value={planeValueSelected}
        onSelect={onChangePlane}
        mode="outlined"
      />
      <Dropdown
        disabled={cableIdentifications.length === 0 || bothSelected}
        label={"Trecho"}
        placeholder="Selecione"
        options={cableIdentifications}
        value={segmentValueSelected}
        onSelect={onSelectCable}
        mode="outlined"
      />
      <Button
        disabled={!bothSelected}
        mode="contained"
        onPress={onClearSelection}
        style={styles.button}
      >
        Limpar seleção
      </Button>
    </View>
  );
};

export default DropdownView;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  button: {
    marginTop: 10,
  },
});
