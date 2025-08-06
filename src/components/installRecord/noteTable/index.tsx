import React, { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { DataTable, Divider, Text } from "react-native-paper";
import { InstallRecord } from "../../../types/installRecord";

interface RecordTableProps {
  records: InstallRecord[];
}

const RecordsTable = ({ records }: RecordTableProps) => {
  const TableHeader = useMemo(
    () => (
      <DataTable.Header>
        <DataTable.Title style={styles.colCircuito}>
          <Text style={styles.textRight}>Circuito</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colDescricao}>
          <Text style={styles.textCenter}>Cabo</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colTag}>
          <Text style={styles.textCenter}>Tag Prev.</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colTag}>
          <Text style={styles.textCenter}>Tag Real</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colLocal}>
          <Text style={styles.textCenter}>Origem</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colLocal}>
          <Text style={styles.textCenter}>Destino</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colFase}>
          <Text style={styles.textCenter}>Fase</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colNumero}>
          <Text style={styles.textRight}>Comp. (m)</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colNumero}>
          <Text style={styles.textRight}>Comp. 3F (m)</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colNumero}>
          <Text style={styles.textRight}>Seção (mm²)</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colNumero}>
          <Text style={styles.textRight}>M. Início</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colNumero}>
          <Text style={styles.textRight}>M. Fim</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colNumero}>
          <Text style={styles.textRight}>Total</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colObs}>
          <Text style={styles.textCenter}>Observação</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.colData}>
          <Text style={styles.textCenter}>Data</Text>
        </DataTable.Title>
      </DataTable.Header>
    ),
    []
  );

  const renderItem = ({ item }: { item: InstallRecord }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.colCircuito}>
        <Text style={styles.textRight}>{item.circuito}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colDescricao}>
        <Text style={styles.textCenter}>{item.descricaoCabo}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colTag}>
        <Text style={styles.textCenter}>{item.tagPrevisto}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colTag}>
        <Text style={styles.textCenter}>{item.tagReal}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colLocal}>
        <Text style={styles.textCenter}>{item.origem}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colLocal}>
        <Text style={styles.textCenter}>{item.destino}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colFase}>
        <Text style={styles.textCenter}>{item.fase}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colNumero}>
        <Text style={styles.textRight}>{item.comprimentoFase}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colNumero}>
        <Text style={styles.textRight}>{item.comprimentoTotal}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colNumero}>
        <Text style={styles.textRight}>{item.secao}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colNumero}>
        <Text style={styles.textRight}>{item.metragemInicio}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colNumero}>
        <Text style={styles.textRight}>{item.metragemFim}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colNumero}>
        <Text style={styles.textRight}>
          {item.metragemInicio - item.metragemFim}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colObs}>
        <Text style={styles.textCenter}>
          {item.observacao && item.observacao.length > 0
            ? item.observacao
            : "-"}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.colData}>
        <Text style={styles.textCenter}>
          {new Date(item.dataLancamento).toLocaleDateString()}
        </Text>
      </DataTable.Cell>
    </DataTable.Row>
  );

  const keyExtractor = (item: InstallRecord) => item.idApontamento.toString();

  return (
    <View style={styles.container}>
      <DataTable>
        <FlatList
          data={records}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={TableHeader}
          ListFooterComponent={<Divider />}
          horizontal={false}
          showsHorizontalScrollIndicator
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          windowSize={15}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: 60,
            offset: 60 * index,
            index,
          })}
        />
      </DataTable>
    </View>
  );
};

export default RecordsTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  colCircuito: {
    minWidth: 80,
    justifyContent: "center",
  },
  colDescricao: {
    minWidth: 160,
    justifyContent: "center",
  },
  colTag: {
    minWidth: 130,
    justifyContent: "center",
  },
  colLocal: {
    minWidth: 120,
    justifyContent: "center",
  },
  colFase: {
    minWidth: 80,
    justifyContent: "center",
  },
  colNumero: {
    minWidth: 100,
    justifyContent: "center",
  },
  colObs: {
    minWidth: 200,
    justifyContent: "center",
  },
  colData: {
    minWidth: 120,
    justifyContent: "center",
  },
});
