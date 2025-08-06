export default class ClientBase {
  isNetworkError(error: any): boolean {
    // Verificar diferentes tipos de erros de rede
    const networkErrorMessages = [
      "Network Error",
      "network error",
      "NETWORK_ERROR",
      "Request failed",
      "timeout",
      "TIMEOUT",
      "ERR_NETWORK",
      "ERR_INTERNET_DISCONNECTED",
      "No internet connection",
      "Connection refused",
      "Server unreachable",
    ];

    const errorMessage = error?.message?.toLowerCase() || "";
    const isNetworkError = networkErrorMessages.some((msg) =>
      errorMessage.includes(msg.toLowerCase())
    );

    // Também verificar códigos de status específicos
    const networkStatusCodes = [0, -1];
    const isNetworkStatus = networkStatusCodes.includes(error?.status);

    return isNetworkError || isNetworkStatus || !error?.status;
  }
}
