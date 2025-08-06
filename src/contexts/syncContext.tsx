import { createContext, ReactNode, useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useNetwork } from "../hooks/useNetwork";
import { syncInstallRecordService } from "../services/installRecord/syncInstallRecord";
import {
  OfflineStorageService,
  pendingRegisterKeys,
} from "../services/offlineStorage";

interface SyncContextData {
  isSyncing: boolean;
  pendingCount: number;
  performManualSync: () => Promise<any>;
  hasPending: boolean;
}

export const SyncContext = createContext<SyncContextData>(
  {} as SyncContextData
);

interface SyncProviderProps {
  children: ReactNode;
}

export const SyncProvider = ({ children }: SyncProviderProps) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const { hasConnection } = useNetwork();
  const { user } = useAuth();

  const updatePendingCount = async () => {
    const storeKeys = Object.values(pendingRegisterKeys);
    const counts = await Promise.all(
      storeKeys.map((storeKey) =>
        new OfflineStorageService(storeKey).getPendingRegisterCount()
      )
    );
    const total = counts.reduce((sum, current) => sum + current, 0);
    setPendingCount(total);
  };

  const performAutoSync = async () => {
    if (isSyncing || !hasConnection || !user?.token || pendingCount === 0)
      return;

    setIsSyncing(true);

    await syncInstallRecordService.syncPendingInstallRecord();

    setIsSyncing(false);
    await updatePendingCount();
  };

  const performManualSync = async () => {
    if (isSyncing || !hasConnection || !user?.token || pendingCount === 0)
      return;

    setIsSyncing(true);

    await syncInstallRecordService.syncPendingInstallRecord();

    setIsSyncing(false);
    await updatePendingCount();
  };

  useEffect(() => {
    if (hasConnection && pendingCount > 0) {
      // Aguardar um pouco para garantir que a conexão está estável
      const timer = setTimeout(() => {
        performAutoSync();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasConnection, pendingCount]);

  // Sincronização quando o app volta ao foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active" && hasConnection) {
        performAutoSync();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription?.remove();
  }, [hasConnection]);

  // Atualizar contador periodicamente
  useEffect(() => {
    updatePendingCount();

    const interval = setInterval(updatePendingCount, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SyncContext.Provider
      value={{
        isSyncing,
        pendingCount,
        performManualSync,
        hasPending: pendingCount > 0,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};
