import AsyncStorage from "@react-native-async-storage/async-storage";
import { CutPlan } from "../../types/cutPlan";
import { Segment } from "../../types/segment";

export interface UpdatedAt {
  label?: string;
  timestamp?: number;
}

class DataAppStorage {
  private CUT_PLAN_KEY = "cut_plan_key";
  private SEGMENT_KEY = "segment_key";
  private UPDATED_AT_KEY = "updated_key";

  async saveDataAppStorage(
    cutPlanes: CutPlan[],
    segments: Segment[]
  ): Promise<void> {
    try {
      await this.clearAllPending();

      const date = new Date();
      const dateString = new Date().toLocaleString();
      const dateStorage: UpdatedAt = {
        label: dateString.slice(0, dateString.length - 3),
        timestamp: date.getTime(),
      };

      await AsyncStorage.setItem(this.CUT_PLAN_KEY, JSON.stringify(cutPlanes));
      await AsyncStorage.setItem(this.SEGMENT_KEY, JSON.stringify(segments));
      await AsyncStorage.setItem(
        this.UPDATED_AT_KEY,
        JSON.stringify(dateStorage)
      );
    } catch (error) {
      console.error("Erro ao salvar dado offline:", error);
      throw error;
    }
  }

  async clearAllPending(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.CUT_PLAN_KEY);
      await AsyncStorage.removeItem(this.SEGMENT_KEY);
      await AsyncStorage.removeItem(this.UPDATED_AT_KEY);
    } catch (error) {
      console.error("Erro ao limpar dados offline:", error);
      throw error;
    }
  }

  async getDateUpdatedAt(): Promise<UpdatedAt | undefined> {
    try {
      const data = await AsyncStorage.getItem(this.UPDATED_AT_KEY);
      return data ? JSON.parse(data) : undefined;
    } catch (error) {
      console.error("Erro ao recuperar dados offline:", error);
      throw error;
    }
  }

  async getCutPlan(): Promise<CutPlan[]> {
    try {
      const data = await AsyncStorage.getItem(this.CUT_PLAN_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao recuperar dados offline:", error);
      throw error;
    }
  }

  async getSegments(): Promise<Segment[]> {
    try {
      const data = await AsyncStorage.getItem(this.SEGMENT_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao recuperar dados offline:", error);
      throw error;
    }
  }
}

export const dataAppStorage = new DataAppStorage();
