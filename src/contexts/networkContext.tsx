import NetInfo from "@react-native-community/netinfo";
import { createContext, ReactNode, useEffect, useState } from "react";

interface NetworkContextData {
  hasConnection: boolean | null;
  setSimulateOffline: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NetworkContext = createContext<NetworkContextData>(
  {} as NetworkContextData
);

interface NetworkProviderProps {
  children: ReactNode;
}

export const NetworkProvider = ({ children }: NetworkProviderProps) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(null);
  const [simulateOffline, setSimulateOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  const hasConnection = isConnected && isInternetReachable && !simulateOffline;

  return (
    <NetworkContext.Provider
      value={{
        hasConnection,
        setSimulateOffline,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
