import { MaterialIcons } from "@expo/vector-icons";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { useDataApp } from "../../../hooks/useDataApp";
import CutPlaneChips from "../../shared/cutPlanChips";

interface CutPlanCardProps {
  isLoading: boolean;
  onLoad: () => void;
}

const CutPlanCard = ({ isLoading, onLoad }: CutPlanCardProps) => {
  const { colors } = useTheme();
  const { isOldCutPlan, updatedAt } = useDataApp();

  const IconUpdate: IconSource = (props) => (
    <MaterialIcons name="sync" size={props.size} color={props.color} />
  );

  return (
    <Card>
      <Card.Title
        title="Planos de Corte"
        titleVariant="displaySmall"
        subtitle="Planos de corte carregados para apontamento"
        subtitleVariant="bodyLarge"
      />
      <Card.Content style={{ gap: 10 }}>
        <CutPlaneChips />
        <Text
          variant="bodyLarge"
          style={{ color: isOldCutPlan ? colors.error : undefined }}
        >
          {updatedAt && updatedAt.label
            ? `Atualizado ${updatedAt.label}`
            : "Necessário carregar planos de corte"}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          disabled={isLoading}
          icon={IconUpdate}
          loading={isLoading}
          mode="contained"
          onPress={onLoad}
        >
          Carregar
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default CutPlanCard;
