import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../hooks/useAuth";
import SplashScreen from "../pages/splash";
import AppTabs from "./AppTabs";
import AuthStack from "./AuthStack";

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { status } = useAuth();

  if (status === "loading") {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {status === "unauth" ? (
        <RootStack.Screen name="Auth" component={AuthStack} />
      ) : (
        <RootStack.Screen name="App" component={AppTabs} />
      )}
    </RootStack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
