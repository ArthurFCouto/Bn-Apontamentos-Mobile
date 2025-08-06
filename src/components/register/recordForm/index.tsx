import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";
import { z } from "zod";

const formSchema = z.object({
  tagReal: z.string().min(1, "Informe a tag"),
  metragemInicio: z
    .string()
    .min(1, "Informe a metragem inicial")
    .regex(/^\d+$/, "A metragem deve ser um número"),
  metragemFim: z
    .string()
    .min(1, "Informe a metragem final")
    .regex(/^\d+$/, "A metragem deve ser um número"),
  observacao: z.string().optional(),
  dataLancamento: z.string(),
});

type RecordFormSchema = z.infer<typeof formSchema>;

export interface RecordFormSubmitData {
  tagReal: string;
  metragemInicio: number;
  metragemFim: number;
  observacao?: string;
  dataLancamento: string;
}

interface RecordFormProps {
  isLoading: boolean;
  isDisabled: boolean;
  submit: (data: RecordFormSubmitData) => void;
}

const RecordForm = ({ isLoading, isDisabled, submit }: RecordFormProps) => {
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecordFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagReal: "",
      metragemInicio: "",
      metragemFim: "",
      observacao: "",
      dataLancamento: new Date().toLocaleDateString(),
    },
  });

  const onSubmit = (data: RecordFormSchema) => {
    submit({
      ...data,
      metragemInicio: Number(data.metragemInicio),
      metragemFim: Number(data.metragemFim),
      dataLancamento: new Date().toISOString(),
    });
  };

  return (
    <Card>
      <Card.Title
        title="Preencha as informações abaixo"
        titleVariant="titleLarge"
      />
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.column}>
            <Controller
              control={control}
              name="tagReal"
              render={({ field: { onChange, value, onBlur } }) => (
                <>
                  <TextInput
                    disabled={isDisabled}
                    label="Tag"
                    mode="outlined"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                  {errors.tagReal && (
                    <Text style={{ color: colors.error }}>
                      {errors.tagReal.message}
                    </Text>
                  )}
                </>
              )}
            />
            <TextInput
              disabled={isDisabled}
              label="Data Lançamento"
              value={new Date().toLocaleDateString()}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={styles.column}>
            <Controller
              control={control}
              name="metragemInicio"
              render={({ field: { onChange, value, onBlur } }) => (
                <>
                  <TextInput
                    disabled={isDisabled}
                    keyboardType="numeric"
                    label="Comp. Inicial (m)"
                    mode="outlined"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(text) =>
                      onChange(text.replace(/[^0-9]/g, ""))
                    }
                  />
                  {errors.metragemInicio && (
                    <Text style={{ color: colors.error }}>
                      {errors.metragemInicio.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="metragemFim"
              render={({ field: { onChange, value, onBlur } }) => (
                <>
                  <TextInput
                    disabled={isDisabled}
                    keyboardType="numeric"
                    label="Comp. Final (m)"
                    mode="outlined"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(text) =>
                      onChange(text.replace(/[^0-9]/g, ""))
                    }
                  />
                  {errors.metragemFim && (
                    <Text style={{ color: colors.error }}>
                      {errors.metragemFim.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>
        </View>
        <Controller
          control={control}
          name="observacao"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              disabled={isDisabled}
              label="Observação"
              mode="outlined"
              multiline
              numberOfLines={2}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
      </Card.Content>
      <Card.Actions>
        <Button
          loading={isLoading}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading || isDisabled}
        >
          Enviar
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default RecordForm;

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
