export interface PhysicsItem {
  id: string;
  quantity: string; // Storhet
  symbol: string;   // Beteckning
  unitShort: string; // SI-enhet (e.g., m/s)
  unitLong: string;  // SI-enhet description (e.g., meter per sekund)
}

export enum QuizMode {
  QUANTITY_TO_UNIT = 'QUANTITY_TO_UNIT', // Läge 1: Storhet -> SI-enhet
  SYMBOL_TO_QUANTITY = 'SYMBOL_TO_QUANTITY', // Läge 2: Beteckning -> Storhet
}

export type QuestionState = 'idle' | 'correct' | 'incorrect';
