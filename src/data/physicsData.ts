import { PhysicsItem, Course } from '../types';

// Fysik 2 - Mekaniska vågor
const mekaniskaVagorData: PhysicsItem[] = [
  { id: '1', quantity: 'Elongation', symbol: 'y', unitShort: 'm', unitLong: 'meter' },
  { id: '2', quantity: 'Amplitud', symbol: 'A', unitShort: 'm', unitLong: 'meter' },
  { id: '3', quantity: 'Vinkelhastighet', symbol: 'ω', unitShort: 'rad/s', unitLong: 'radianer per sekund' },
  { id: '4', quantity: 'Tid', symbol: 't', unitShort: 's', unitLong: 'sekund' },
  { id: '5', quantity: 'Hastighet', symbol: 'v', unitShort: 'm/s', unitLong: 'meter per sekund' },
  { id: '6', quantity: 'Acceleration', symbol: 'a', unitShort: 'm/s²', unitLong: 'meter per sekundkvadrat' },
  { id: '7', quantity: 'Periodtid', symbol: 'T', unitShort: 's', unitLong: 'sekund' },
  { id: '8', quantity: 'Frekvens', symbol: 'f', unitShort: 'Hz', unitLong: 'hertz' },
  { id: '9', quantity: 'Energi', symbol: 'E', unitShort: 'J', unitLong: 'joule' },
  { id: '10', quantity: 'Fjäderkonstant', symbol: 'k', unitShort: 'N/m', unitLong: 'newton per meter' },
  { id: '11', quantity: 'Massa', symbol: 'm', unitShort: 'kg', unitLong: 'kilogram' },
  { id: '12', quantity: 'Längd', symbol: 'l', unitShort: 'm', unitLong: 'meter' },
  { id: '13', quantity: 'Tyngdfaktor', symbol: 'g', unitShort: 'N/kg', unitLong: 'newton per kilogram' },
  { id: '14', quantity: 'Våglängd', symbol: 'λ', unitShort: 'm', unitLong: 'meter' },
  { id: '15', quantity: 'Intensitet', symbol: 'I', unitShort: 'W/m²', unitLong: 'watt per kvadratmeter' },
  { id: '16', quantity: 'Effekt', symbol: 'P', unitShort: 'W', unitLong: 'watt' },
  { id: '17', quantity: 'Area', symbol: 'A', unitShort: 'm²', unitLong: 'kvadratmeter' },
  { id: '18', quantity: 'Ljudnivå', symbol: 'L', unitShort: 'dB', unitLong: 'decibel' },
  { id: '19', quantity: 'Kraft', symbol: 'F', unitShort: 'N', unitLong: 'newton' },
];

// Fysik 1 - Energi, tryck och värme
const energiTryckVarmeData: PhysicsItem[] = [
  { id: '1', quantity: 'Tid', symbol: 't', unitShort: 's', unitLong: 'sekund', commonWrongUnits: ['min', 'h'] },
  { id: '2', quantity: 'Längd', symbol: 's', unitShort: 'm', unitLong: 'meter', commonWrongUnits: ['cm', 'mm', 'km'] },
  { id: '3', quantity: 'Massa', symbol: 'm', unitShort: 'kg', unitLong: 'kilogram', commonWrongUnits: ['g', 'ton'] },
  { id: '4', quantity: 'Temperatur', symbol: 'T', unitShort: 'K', unitLong: 'kelvin', commonWrongUnits: ['°C', '°F'] },
  { id: '5', quantity: 'Area', symbol: 'A', unitShort: 'm²', unitLong: 'kvadratmeter', commonWrongUnits: ['cm²', 'dm²', 'km²'] },
  { id: '6', quantity: 'Volym', symbol: 'V', unitShort: 'm³', unitLong: 'kubikmeter', commonWrongUnits: ['dm³', 'liter', 'cm³', 'ml'] },
  { id: '7', quantity: 'Densitet', symbol: 'ρ', unitShort: 'kg/m³', unitLong: 'kilogram per kubikmeter', commonWrongUnits: ['g/cm³', 'kg/dm³'] },
  { id: '8', quantity: 'Hastighet', symbol: 'v', unitShort: 'm/s', unitLong: 'meter per sekund', commonWrongUnits: ['km/h', 'cm/s'] },
  { id: '9', quantity: 'Acceleration', symbol: 'a', unitShort: 'm/s²', unitLong: 'meter per sekundkvadrat', commonWrongUnits: ['km/h²', 'cm/s²'] },
  { id: '10', quantity: 'Kraft', symbol: 'F', unitShort: 'N', unitLong: 'newton' },
  { id: '11', quantity: 'Tryck', symbol: 'p', unitShort: 'Pa', unitLong: 'pascal', commonWrongUnits: ['bar', 'atm', 'mmHg'] },
  { id: '12', quantity: 'Arbete', symbol: 'W', unitShort: 'Nm', unitLong: 'newtonmeter', commonWrongUnits: ['kWh', 'cal'] },
  { id: '13', quantity: 'Energi', symbol: 'E', unitShort: 'J', unitLong: 'joule', commonWrongUnits: ['kWh', 'cal', 'eV'] },
  { id: '14', quantity: 'Effekt', symbol: 'P', unitShort: 'W', unitLong: 'watt', commonWrongUnits: ['kW', 'hk'] },
  { id: '15', quantity: 'Rörelsemängd', symbol: 'p', unitShort: 'kgm/s', unitLong: 'kilogrammeter per sekund' },
  { id: '16', quantity: 'Impuls', symbol: 'I', unitShort: 'Ns', unitLong: 'newtonsekund' },
  { id: '17', quantity: 'Specifik värmekapacitet', symbol: 'c', unitShort: 'J/(kg·K)', unitLong: 'joule per kilogram-kelvin', commonWrongUnits: ['J/g', 'cal/(g·°C)'] },
  { id: '18', quantity: 'Entalpitet', symbol: 'l', unitShort: 'J/kg', unitLong: 'joule per kilogram', commonWrongUnits: ['kJ/kg', 'cal/g'] },
];

export const courses: Course[] = [
  {
    id: 'fysik-1',
    name: 'Fysik 1',
    chapters: [
      {
        id: 'energi-tryck-varme',
        name: 'Energi, tryck och värme',
        description: 'Grundläggande koncept om energi, tryck och värme',
        data: energiTryckVarmeData,
        color: 'green',
      },
    ],
  },
  {
    id: 'fysik-2',
    name: 'Fysik 2',
    chapters: [
      {
        id: 'mekaniska-vagor',
        name: 'Mekaniska vågor',
        description: 'Svängningar, vågor och ljudfenomen',
        data: mekaniskaVagorData,
        color: 'blue',
      },
    ],
  },
];

// Export för bakåtkompatibilitet
export const physicsData = mekaniskaVagorData;
