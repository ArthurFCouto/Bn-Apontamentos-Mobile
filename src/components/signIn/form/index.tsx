import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { z as zod } from "zod";

const signInSchema = zod.object({
  matricula: zod
    .string()
    .min(1, "Informe a matricula")
    .regex(/^\d{8}$/, "A matrícula deve conter 8 números"),
  senha: zod.string().min(1, "A senha é obrigatória"),
});

export type SignInSchema = zod.infer<typeof signInSchema>;

interface FormProps {
  onSubmit: (data: SignInSchema) => void;
  onError: (data: string) => void;
}

const Form = ({ onSubmit, onError }: FormProps) => {
  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      matricula: "",
      senha: "",
    },
  });

  return (
    <View style={styles.form}>
      <View>
        <Controller
          control={control}
          name="matricula"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                error={Boolean(errors.matricula)}
                keyboardType="numeric"
                label="Matrícula"
                left={<TextInput.Icon icon="account" />}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
                outlineColor={colors.background}
                outlineStyle={{ borderRadius: 30 }}
                style={styles.input}
                value={value}
              />
              <HelperText type="error" visible={Boolean(errors.matricula)}>
                {errors?.matricula?.message}
              </HelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                error={Boolean(errors.senha)}
                label="Senha"
                left={<TextInput.Icon icon="lock-outline" />}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                outlineColor={colors.background}
                outlineStyle={{ borderRadius: 30 }}
                secureTextEntry
                style={styles.input}
                value={value}
              />
              <HelperText type="error" visible={Boolean(errors.senha)}>
                {errors?.senha?.message}
              </HelperText>
            </>
          )}
        />
      </View>
      <Button
        compact
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Entrar
      </Button>
      <View style={styles.signUp}>
        <Text variant="titleMedium">Se não tem acesso, solicite</Text>
        <Button
          compact
          mode="text"
          labelStyle={styles.signUpButton}
          onPress={() => onError("Ainda em implementação.")}
        >
          Aqui
        </Button>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  input: {
    height: 50,
    fontSize: 22,
  },
  signUp: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  signUpButton: {
    fontSize: 16,
    fontWeight: "600",
  },
});
