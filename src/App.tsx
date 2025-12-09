import React, { useState } from 'react';
import { QuizMode } from './types';
import { QuizGame } from './components/QuizGame';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<QuizMode | null>(null);

  if (currentMode) {
    return (
      <div className="min-h-screen bg-gray-50 pb-4">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-2 text-sm">FK</span>
              Fysik-kollen
            </h1>
          </div>
        </header>
        <main>
          <QuizGame
            mode={currentMode}
            onExit={() => setCurrentMode(null)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="bg-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
             <BookOpen className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Fysik-kollen</h1>
          <p className="text-gray-500 text-lg">
            Träna på att koppla ihop storheter med rätt enheter och beteckningar.
          </p>
        </div>

        <div className="space-y-4">
          <div
            onClick={() => setCurrentMode(QuizMode.QUANTITY_TO_UNIT)}
            className="group relative bg-white border-2 border-gray-100 hover:border-indigo-500 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-xl mr-4 group-hover:bg-blue-200 transition-colors">
                  <span className="font-serif italic font-bold text-blue-700 text-xl">E</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Läge 1</h3>
                  <p className="text-sm text-gray-500">Storhet ➔ SI-enhet</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>

          <div
            onClick={() => setCurrentMode(QuizMode.SYMBOL_TO_QUANTITY)}
            className="group relative bg-white border-2 border-gray-100 hover:border-indigo-500 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-xl mr-4 group-hover:bg-purple-200 transition-colors">
                  <RotateCcw className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Läge 2</h3>
                  <p className="text-sm text-gray-500">Beteckning ➔ Storhet</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">Baserat på kapitel 2 sammanfattningen.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
