import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme } from "react-native-paper";
import { useSync } from "../hooks/useSync";
import Account from "../pages/account";
import Dashboard from "../pages/dashboard";
import StatusApp from "../pages/statusApp";
import InstallRecordStack from "./NotationStack";

export type AppTabParamList = {
  Dashboard: undefined;
  RecordStack: undefined;
  AppStatus: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppTabs() {
  const { hasPending, pendingCount } = useSync();
  const { colors } = useTheme();

  const numberTabBarBadge = hasPending
    ? pendingCount > 9
      ? "9+"
      : pendingCount
    : undefined;

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="RecordStack"
        component={InstallRecordStack}
        options={{
          title: "Apontamentos",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="pencil-square-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AppStatus"
        component={StatusApp}
        options={{
          title: "Status",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="info-circle" size={size} color={color} />
          ),
          tabBarBadge: numberTabBarBadge,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          title: "Conta",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
