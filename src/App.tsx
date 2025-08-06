import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts/authContext";
import { DataAppProvider } from "./contexts/dataAppContext";
import { NetworkProvider } from "./contexts/networkContext";
import { SyncProvider } from "./contexts/syncContext";
import Navigation from "./navigation";

import { theme } from "./theme";

export default () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  return (
    <PaperProvider theme={theme}>
      <NetworkProvider>
        <AuthProvider>
          <SyncProvider>
            <DataAppProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <Navigation />
              </SafeAreaView>
            </DataAppProvider>
          </SyncProvider>
        </AuthProvider>
      </NetworkProvider>
    </PaperProvider>
  );
};
