import React from 'react';
import { motion } from 'framer-motion';
import { Chapter, Course } from '../types';
import { ArrowRight, ArrowLeft, Waves, Flame } from 'lucide-react';

interface ChapterSelectionProps {
  course: Course;
  onSelectChapter: (chapter: Chapter) => void;
  onBack: () => void;
}

export const ChapterSelection: React.FC<ChapterSelectionProps> = ({ course, onSelectChapter, onBack }) => {
  const getChapterIcon = (chapterId: string) => {
    switch (chapterId) {
      case 'mekaniska-vagor':
        return Waves;
      case 'energi-tryck-varme':
        return Flame;
      default:
        return Waves;
    }
  };

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      hoverBg: 'group-hover:bg-blue-200',
      text: 'text-blue-700',
      border: 'hover:border-blue-500',
    },
    green: {
      bg: 'bg-green-100',
      hoverBg: 'group-hover:bg-green-200',
      text: 'text-green-700',
      border: 'hover:border-green-500',
    },
    purple: {
      bg: 'bg-purple-100',
      hoverBg: 'group-hover:bg-purple-200',
      text: 'text-purple-700',
      border: 'hover:border-purple-500',
    },
  };

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
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{course.name}</h1>
          <p className="text-gray-500 text-lg">
            Välj ett kapitel att öva på
          </p>
        </div>

        <div className="space-y-4">
          {course.chapters.map((chapter, index) => {
            const Icon = getChapterIcon(chapter.id);
            const colors = colorClasses[chapter.color as keyof typeof colorClasses] || colorClasses.blue;
            const isDisabled = chapter.data.length === 0;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => !isDisabled && onSelectChapter(chapter)}
                className={`group relative bg-white border-2 border-gray-100 ${!isDisabled ? `${colors.border} cursor-pointer hover:shadow-lg active:scale-95` : 'opacity-50 cursor-not-allowed'} rounded-2xl p-6 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`${colors.bg} ${!isDisabled ? colors.hoverBg : ''} p-3 rounded-xl mr-4 transition-colors`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{chapter.name}</h3>
                      <p className="text-sm text-gray-500">{chapter.description}</p>
                      {isDisabled && (
                        <p className="text-xs text-orange-600 mt-1">Kommer snart!</p>
                      )}
                    </div>
                  </div>
                  {!isDisabled && (
                    <ArrowRight className={`w-5 h-5 text-gray-300 group-hover:${colors.text} transition-colors`} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
