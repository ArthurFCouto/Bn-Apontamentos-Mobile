export interface User {
  matricula: string;
  nome: string;
  avatar?: string;
  token: string;

  [key: string]: unknown;
}
