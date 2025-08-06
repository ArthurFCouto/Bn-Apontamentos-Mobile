export interface ResponseRecord<T> {
  totalRegistros: number;
  totalPaginas: number;
  pagina: number;
  quantidadePorPagina: number;
  registros: T[];
}
