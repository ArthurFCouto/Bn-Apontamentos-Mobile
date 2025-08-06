export interface Segment {
  idTrecho: number;
  idPlanoDeCorte: number;
  circuito: number;
  identificacaoCabo: string;
  tagPrevisto: string;
  origem: string;
  destino: string;
  fase: string;
  comprimentoFase: number;
  comprimentoTodasFases: number;
  secao: number;
  ativo: boolean;
}
