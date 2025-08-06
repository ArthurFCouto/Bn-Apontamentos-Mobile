import { NavigatorScreenParams } from "@react-navigation/native";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}

    interface RootStackParamList {
      Auth: undefined;
      App: NavigatorScreenParams<AppTabParamList>;
    }

    interface AppTabParamList {
      Dashboard: undefined;
      RecordStack: NavigatorScreenParams<RecordStackParamList>;
      AppStatus: undefined;
      Account: undefined;
    }

    interface RecordStackParamList {
      InstallRecord: undefined;
      Register: undefined;
    }

    interface AuthStackParamList {
      SignIn: undefined;
    }
  }
}
