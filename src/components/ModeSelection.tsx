import React from 'react';
import { motion } from 'framer-motion';
import { QuizMode, Course, Chapter } from '../types';
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';

interface ModeSelectionProps {
  course: Course;
  chapter: Chapter;
  onSelectMode: (mode: QuizMode) => void;
  onBack: () => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({ course, chapter, onSelectMode, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
      >
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{chapter.name}</h1>
          <p className="text-gray-500 text-base mb-1">{course.name}</p>
          <p className="text-gray-400 text-sm">
            Välj ett övningsläge
          </p>
        </div>

        <div className="space-y-4">
          <div
            onClick={() => onSelectMode(QuizMode.QUANTITY_TO_UNIT)}
            className="group relative bg-white border-2 border-gray-100 hover:border-indigo-500 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-xl mr-4 group-hover:bg-blue-200 transition-colors">
                  <span className="font-serif italic font-bold text-blue-700 text-xl">E</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Storhet ➔ SI-enhet</h3>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>

          <div
            onClick={() => onSelectMode(QuizMode.SYMBOL_TO_QUANTITY)}
            className="group relative bg-white border-2 border-gray-100 hover:border-indigo-500 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-xl mr-4 group-hover:bg-purple-200 transition-colors">
                  <RotateCcw className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Beteckning ➔ Storhet</h3>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">{chapter.data.length} frågor tillgängliga</p>
        </div>
      </motion.div>
    </div>
  );
};
