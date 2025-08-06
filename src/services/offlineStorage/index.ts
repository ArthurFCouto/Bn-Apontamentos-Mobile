import AsyncStorage from "@react-native-async-storage/async-storage";

export const pendingRegisterKeys = {
  INSTALL_RECORD: "pending_install_record",
};

export interface StoragePeding {
  id: string;
  createdAt: string;
  attempts: 0;
}

export class OfflineStorageService {
  private PENDING_KEY = "";

  constructor(pendingKey: string) {
    this.PENDING_KEY = pendingKey;
  }

  async savePendingRegister<T>(data: T): Promise<string> {
    try {
      const pendings = await this.getPendingsRegister();

      const pendingData = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        attempts: 0,
      };

      const updatedPending = [...pendings, pendingData];
      await AsyncStorage.setItem(
        this.PENDING_KEY,
        JSON.stringify(updatedPending)
      );

      return pendingData.id;
    } catch (error) {
      console.error("Erro ao salvar dado offline:", error);
      throw error;
    }
  }

  async removePendingRegister(id: string): Promise<void> {
    try {
      const pendings = await this.getPendingsRegister();
      const updated = pendings.filter((padding: any) => padding.id !== id);
      await AsyncStorage.setItem(this.PENDING_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Erro ao remover apontamento offline:", error);
      throw error;
    }
  }

  async updateAttempts(id: string): Promise<void> {
    try {
      const pendings = await this.getPendingsRegister();
      const updated = pendings.map((pending: any) => {
        if (pending.id === id) {
          return {
            ...pending,
            attempts: pending.attempts + 1,
            lastAttempt: new Date().toISOString(),
          };
        }
        return pending;
      });
      await AsyncStorage.setItem(this.PENDING_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Erro ao atualizar tentativas:", error);
      throw error;
    }
  }

  async clearAllPending(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.PENDING_KEY);
    } catch (error) {
      console.error("Erro ao limpar dados offline:", error);
      throw error;
    }
  }

  async getPendingsRegister<T extends StoragePeding>(): Promise<T[]> {
    try {
      const paddings = await AsyncStorage.getItem(this.PENDING_KEY);
      return paddings ? JSON.parse(paddings) : [];
    } catch (error) {
      console.error("Erro ao recuperar dados offline:", error);
      return [];
    }
  }

  async getPendingRegisterCount(): Promise<number> {
    const paddings = await this.getPendingsRegister();
    return paddings.length;
  }
}
