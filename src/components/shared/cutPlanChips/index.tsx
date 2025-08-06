import { ScrollView } from "react-native";
import { Chip, useTheme } from "react-native-paper";
import { useDataApp } from "../../../hooks/useDataApp";

const CutPlanChips = () => {
  const { colors } = useTheme();
  const { cutPlans } = useDataApp();
  const Chips = () => (
    <>
      {cutPlans.map((x) => {
        return (
          <Chip
            key={x.id}
            style={{
              backgroundColor: colors.tertiaryContainer,
              marginRight: 5,
            }}
          >
            {x.nome}
          </Chip>
        );
      })}
    </>
  );

  if (cutPlans.length == 0) {
    return null;
  }

  return (
    <ScrollView horizontal>
      <Chips />
    </ScrollView>
  );
};

export default CutPlanChips;
