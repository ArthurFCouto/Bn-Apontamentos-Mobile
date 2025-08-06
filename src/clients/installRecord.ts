import ClientBase from ".";
import api from "../services/api";
import {
  OfflineStorageService,
  pendingRegisterKeys,
} from "../services/offlineStorage";
import type {
  InstallRecord,
  InstallRecordSubmit,
} from "../types/installRecord";
import { ResponseRecord } from "../types/responseRecord";
import { authClient } from "./auth";

export interface CreateRecordResult {
  error?: string;
  status?: number;
  savedOffline?: boolean;
  offlineId?: string;
}

class InstallRecordClient extends ClientBase {
  async getAll(
    page: number,
    countPerPage: number
  ): Promise<{
    data?: ResponseRecord<InstallRecord>;
    error?: string;
    status?: number;
  }> {
    const { token } = await authClient.getToken();
    return await api
      .get("/apontamento", {
        params: {
          PaginaAtual: page,
          QuantidadePorPagina: countPerPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (
          response.status === 200 &&
          Array.isArray(response.data.data.registros)
        ) {
          return { data: response.data.data };
        }

        return { status: response.status };
      })
      .catch((error) => {
        return { error: error.message, status: error.status };
      });
  }

  async create(request: InstallRecordSubmit): Promise<CreateRecordResult> {
    const body = {
      idTrecho: request.idTrecho,
      matriculaUsuario: request.matriculaUsuario,
      tagReal: request.tagReal,
      metragemInicio: request.metragemInicio,
      metragemFim: request.metragemFim,
      observacao: request.observacao,
      dataLancamento: request.dataLancamento,
    };

    const { token } = await authClient.getToken();
    return await api
      .post("/apontamento", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return {};
        }

        return { status: response.status };
      })
      .catch(async (error) => {
        const isNetworkError = this.isNetworkError(error);

        if (isNetworkError) {
          const offlineService = new OfflineStorageService(
            pendingRegisterKeys.INSTALL_RECORD
          );
          try {
            const offlineId = await offlineService.savePendingRegister(request);
            return {
              error: "Apontamento salvo offline.",
              savedOffline: true,
              offlineId,
              status: error.status,
            };
          } catch (offlineError) {
            return {
              error: `Erro ao salvar apontamento offline: ${offlineError}`,
              status: error.status,
            };
          }
        }

        return {
          error: error.message,
          status: error.status,
        };
      });
  }

  async createOffLine(
    request: InstallRecordSubmit
  ): Promise<CreateRecordResult> {
    const body = {
      idTrecho: request.idTrecho,
      matriculaUsuario: request.matriculaUsuario,
      tagReal: request.tagReal,
      metragemInicio: request.metragemInicio,
      metragemFim: request.metragemFim,
      observacao: request.observacao,
      dataLancamento: request.dataLancamento,
    };
    const offlineService = new OfflineStorageService(
      pendingRegisterKeys.INSTALL_RECORD
    );
    try {
      const offlineId = await offlineService.savePendingRegister(body);
      return {
        error: "Apontamento salvo offline.",
        savedOffline: true,
        offlineId,
        status: -1,
      };
    } catch (offlineError) {
      return {
        error: `Erro ao salvar apontamento offline: ${offlineError}`,
        status: 0,
      };
    }
  }
}

export const installRecordClient = new InstallRecordClient();
