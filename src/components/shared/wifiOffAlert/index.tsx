import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { useNetwork } from "../../../hooks/useNetwork";

const WifiOffAlert = () => {
  const { colors, fonts } = useTheme();
  const { hasConnection } = useNetwork();

  if (hasConnection) {
    return null;
  }

  return (
    <Surface
      style={[
        {
          alignItems: "center",
          borderRadius: 10,
          flexDirection: "row",
          gap: 10,
          padding: 10,
        },
        { backgroundColor: colors.errorContainer },
      ]}
    >
      <MaterialIcons
        color={colors.error}
        name="wifi-off"
        size={fonts.headlineMedium.fontSize}
      />
      <View>
        <Text variant="titleMedium" style={{ color: colors.error }}>
          Você está trabalhando offline
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.error }}>
          Lembre-se de sincronizar os dados ao fim da operação.
        </Text>
      </View>
    </Surface>
  );
};

export default WifiOffAlert;
