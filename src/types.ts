export interface PhysicsItem {
  id: string;
  quantity: string; // Storhet
  symbol: string;   // Beteckning
  unitShort: string; // SI-enhet (e.g., m/s)
  unitLong: string;  // SI-enhet description (e.g., meter per sekund)
  commonWrongUnits?: string[]; // Vanliga fel enheter (inte SI-enheter men relaterade)
}

export enum QuizMode {
  QUANTITY_TO_UNIT = 'QUANTITY_TO_UNIT', // Läge 1: Storhet -> SI-enhet
  SYMBOL_TO_QUANTITY = 'SYMBOL_TO_QUANTITY', // Läge 2: Beteckning -> Storhet
}

export type QuestionState = 'idle' | 'correct' | 'incorrect';

export interface Chapter {
  id: string;
  name: string;
  description: string;
  data: PhysicsItem[];
  color: string; // Färg för visuell åtskillnad
}

export interface Course {
  id: string;
  name: string;
  chapters: Chapter[];
}
