import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecordPage from "../pages/installRecord";
import Register from "../pages/register";

export type RecordStackParamList = {
  InstallRecord: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RecordStackParamList>();

export default function InstallRecordStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InstallRecord"
        component={RecordPage}
        options={{ title: "Apontamentos", headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "Registrar",
          headerShown: false,
          //presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
