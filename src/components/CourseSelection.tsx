import React from 'react';
import { motion } from 'framer-motion';
import { Course } from '../types';
import { ArrowRight, BookOpen } from 'lucide-react';

interface CourseSelectionProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const CourseSelection: React.FC<CourseSelectionProps> = ({ courses, onSelectCourse }) => {
  const courseIconColors = {
    'fysik-1': 'bg-green-100 group-hover:bg-green-200',
    'fysik-2': 'bg-blue-100 group-hover:bg-blue-200',
  };

  const courseTextColors = {
    'fysik-1': 'text-green-700',
    'fysik-2': 'text-blue-700',
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="bg-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <BookOpen className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Enhetskollen</h1>
          <p className="text-gray-500 text-lg">
            Välj en kurs för att börja träna
          </p>
        </div>

        <div className="space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectCourse(course)}
              className="group relative bg-white border-2 border-gray-100 hover:border-indigo-500 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`${courseIconColors[course.id as keyof typeof courseIconColors] || 'bg-gray-100'} p-3 rounded-xl mr-4 transition-colors`}>
                    <span className={`font-bold ${courseTextColors[course.id as keyof typeof courseTextColors] || 'text-gray-700'} text-xl`}>
                      {course.name.charAt(course.name.length - 1)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.chapters.length} kapitel</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
