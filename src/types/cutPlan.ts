export interface CutPlan {
  id: number;
  nome: string;
  circuitos: number[];
}

export interface CutPlanWithSegmentId {
  id: number;
  nome: string;
  trechos: [
    {
      id: number;
      identificacaoCabo: string;
    }
  ];
}
