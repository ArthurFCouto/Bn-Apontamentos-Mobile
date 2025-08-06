import * as SecureStore from "expo-secure-store";
import api from "../services/api";
import type { User } from "../types/user";

class AuthClient {
  async signInWithPassword(params: {
    matricula: string;
    senha: string;
  }): Promise<{ user?: User; error?: string; status?: number }> {
    return await api
      .post("/usuario/login", params)
      .then(async (response) => {
        if (response.status === 200) {
          const { token, nome, matricula, avatar } = response.data.data;

          const user = {
            nome,
            matricula,
            token,
            avatar,
          };

          await SecureStore.setItemAsync("token", token);
          await SecureStore.setItemAsync("user", JSON.stringify(user));
          return { user };
        }

        return {
          error: "Usuário ou senha incorretos.",
          status: response.status,
        };
      })
      .catch((error) => {
        return { error: error.message, status: error.status };
      });
  }

  async getUser(): Promise<{ user?: User; error?: string }> {
    try {
      const token = await SecureStore.getItemAsync("token");
      const user = await SecureStore.getItemAsync("user");

      if (token && user) {
        const parsed = JSON.parse(user);
        return {
          user: {
            matricula: parsed.matricula,
            nome: parsed.nome,
            token: token,
            avatar: parsed.avatar,
          },
        };
      }

      return { error: "Usuário não autenticado." };
    } catch (error: any) {
      return {
        error: "Erro ao obter dados savos do usuário.",
      };
    }
  }

  async getToken(): Promise<{ token?: string; error?: string }> {
    try {
      const token = await SecureStore.getItemAsync("token");

      return token ? { token } : { error: "Usuário não autenticado." };
    } catch (error: any) {
      return {
        error: "Erro ao obter dados savos do usuário.",
      };
    }
  }

  async signOut(): Promise<void> {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
  }
}

export const authClient = new AuthClient();
