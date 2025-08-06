import { StyleSheet } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

interface AlertProps {
  message: string;
}

const Alert = ({ message }: AlertProps) => {
  const { colors } = useTheme();
  return (
    <Surface
      style={[styles.container, { backgroundColor: colors.errorContainer }]}
    >
      <Text variant="bodyMedium" style={{ color: colors.error }}>
        {message}
      </Text>
    </Surface>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
});
