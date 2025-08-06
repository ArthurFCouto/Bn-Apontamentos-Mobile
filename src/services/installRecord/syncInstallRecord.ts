import { installRecordClient } from "../../clients/installRecord";
import { InstallRecordSubmit } from "../../types/installRecord";
import {
  OfflineStorageService,
  pendingRegisterKeys,
  StoragePeding,
} from "../offlineStorage";

export interface SyncResult {
  success: number;
  failed: number;
  total: number;
  errors: string[];
}

class SyncInstallRecordService {
  private isSyncing = false;
  private syncCallbacks: ((result: SyncResult) => void)[] = [];

  async syncPendingInstallRecord(): Promise<SyncResult> {
    if (this.isSyncing) {
      return {
        success: 0,
        failed: 0,
        total: 0,
        errors: ["Sincronização já em andamento"],
      };
    }

    this.isSyncing = true;
    const result: SyncResult = { success: 0, failed: 0, total: 0, errors: [] };
    const offlineService = new OfflineStorageService(
      pendingRegisterKeys.INSTALL_RECORD
    );

    try {
      const pendingRecords = await offlineService.getPendingsRegister<
        InstallRecordSubmit & StoragePeding
      >();
      result.total = pendingRecords.length;

      if (pendingRecords.length === 0) {
        return result;
      }

      for (const record of pendingRecords) {
        try {
          await offlineService.updateAttempts(record.id);

          const { error, status } = await installRecordClient.create(record);

          if (error || (status && status !== 200)) {
            result.failed++;
            result.errors.push(
              `Erro ao sincronizar apontamento ${record.id}: ${
                error || `Status ${status}`
              }`
            );
          } else {
            result.success++;
            await offlineService.removePendingRegister(record.id);
          }
        } catch (error) {
          result.failed++;
          result.errors.push(
            `Erro inesperado ao sincronizar ${record.id}: ${error}`
          );
        }
      }

      this.syncCallbacks.forEach((callback) => callback(result));

      return result;
    } catch (error) {
      result.errors.push(`Erro geral na sincronização: ${error}`);
      return result;
    } finally {
      this.isSyncing = false;
    }
  }

  onSyncComplete(callback: (result: SyncResult) => void): () => void {
    this.syncCallbacks.push(callback);

    return () => {
      const index = this.syncCallbacks.indexOf(callback);
      if (index > -1) {
        this.syncCallbacks.splice(index, 1);
      }
    };
  }

  getIsSyncing(): boolean {
    return this.isSyncing;
  }
}

export const syncInstallRecordService = new SyncInstallRecordService();
