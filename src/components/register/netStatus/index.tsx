import { StyleSheet, View } from "react-native";
import { Badge } from "react-native-paper";
import { useNetwork } from "../../../hooks/useNetwork";
import { useSync } from "../../../hooks/useSync";

const NetStatus = () => {
  const { hasConnection } = useNetwork();
  const { pendingCount } = useSync();

  return (
    <View style={styles.statusContainer}>
      {!hasConnection && <Badge style={styles.offlineBadge}>Offline</Badge>}

      {pendingCount > 0 && (
        <Badge style={styles.pendingBadge}>
          {`${pendingCount} pendente(s)`}
        </Badge>
      )}
    </View>
  );
};

export default NetStatus;

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  offlineBadge: {
    backgroundColor: "#f44336",
  },
  pendingBadge: {
    backgroundColor: "#ff9800",
  },
  pendingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
