import api from "../services/api";
import type { CutPlan, CutPlanWithSegmentId } from "../types/cutPlan";
import { authClient } from "./auth";

class CutClient {
  async getAll(): Promise<{
    data?: CutPlan[];
    error?: string;
    status?: number;
  }> {
    const { token } = await authClient.getToken();
    return await api
      .get("/plano-de-corte", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return { data: response.data.data };
        }

        return { data: [], status: response.status };
      })
      .catch((error) => {
        return { error: error.message, status: error.status };
      });
  }

  async getAllWithSegment(): Promise<{
    data?: CutPlanWithSegmentId[];
    error?: string;
    status?: number;
  }> {
    const { token } = await authClient.getToken();
    return await api
      .get("/plano-de-corte/trecho", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return { data: response.data.data };
        }

        return { data: [], status: response.status };
      })
      .catch((error) => {
        return { error: error.message, status: error.status };
      });
  }
}

export const cutClient = new CutClient();
