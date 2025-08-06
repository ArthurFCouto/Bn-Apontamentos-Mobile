import { StyleSheet, View } from "react-native";
import { Card, TextInput, useTheme } from "react-native-paper";
import { Segment } from "../../../types/segment";

const defaultValues = {
  idTrecho: 0,
  circuito: 0,
  identificacaoCabo: "Agurdando seleção",
  tagPrevisto: " ",
  origem: " ",
  destino: " ",
  fase: " ",
  comprimentoFase: 0,
  comprimentoTodasFases: 0,
  secao: 0,
} as Segment;

interface SegmentDetailsProps {
  information?: Segment;
}

const SegmentDetails = ({
  information = defaultValues,
}: SegmentDetailsProps) => {
  const { colors } = useTheme();
  return (
    <Card>
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.column}>
            <TextInput
              label="Circuito"
              value={String(information.circuito)}
              editable={false}
              mode="flat"
              style={{ backgroundColor: "transparent" }}
            />
            <TextInput
              label="Tag Previsto"
              value={information.tagPrevisto}
              editable={false}
              mode="flat"
              style={{ backgroundColor: "transparent" }}
            />
            <TextInput
              label="Origem"
              value={information.origem}
              editable={false}
              mode="flat"
              style={{ backgroundColor: "transparent" }}
            />
            <TextInput
              label="Destino"
              value={information.destino}
              editable={false}
              mode="flat"
              style={{ backgroundColor: "transparent" }}
            />
          </View>
          <View style={styles.column}>
            <TextInput
              label="Fase"
              value={information.fase}
              editable={false}
              mode="flat"
              style={{ backgroundColor: "transparent" }}
            />
            <TextInput
              label="Comp. (m)"
              value={String(information.comprimentoFase)}
              editable={false}
              mode="flat"
              style={{ backgroundColor: "transparent" }}
            />
            <TextInput
              label="Comp. 3F (m)"
              value={String(information.comprimentoTodasFases)}
              editable={false}
              mode="flat"
              style={{ backgroundColor: "transparent" }}
            />
            <TextInput
              label="Seção (mm²)"
              value={String(information.secao)}
              editable={false}
              mode="flat"
              style={{ backgroundColor: "transparent" }}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default SegmentDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  column: {
    flex: 1,
    minWidth: "48%",
    gap: 10,
  },
});
