import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../pages/signIn";

export type AuthStackParamList = {
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
