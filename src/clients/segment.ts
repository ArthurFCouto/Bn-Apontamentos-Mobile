import api from "../services/api";
import { Segment } from "../types/segment";
import { authClient } from "./auth";

class SegmentClient {
  async getSegmentById(id: string): Promise<{
    data?: Segment;
    error?: string;
    status?: number;
  }> {
    const { token } = await authClient.getToken();
    return await api
      .get(`/trecho/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return { data: response.data.data };
        }

        return { status: response.status };
      })
      .catch((error) => {
        return { status: error.status, error: error.message };
      });
  }

  async getSegments(idPlanoDeCorte: number[]): Promise<{
    data?: Segment[];
    error?: string;
    status?: number;
  }> {
    const { token } = await authClient.getToken();
    return await api
      .get(`/trecho`, {
        params: {
          idPlanoDeCorte,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return { data: response.data.data };
        }

        return { status: response.status };
      })
      .catch((error) => {
        return { status: error.status, error: error.message };
      });
  }
}

export const segmentClient = new SegmentClient();
