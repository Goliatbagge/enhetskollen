import React, { useState } from 'react';
import { QuizMode, Course, Chapter } from './types';
import { QuizGame } from './components/QuizGame';
import { CourseSelection } from './components/CourseSelection';
import { ChapterSelection } from './components/ChapterSelection';
import { ModeSelection } from './components/ModeSelection';
import { courses } from './data/physicsData';

type NavigationState =
  | { screen: 'course-selection' }
  | { screen: 'chapter-selection'; course: Course }
  | { screen: 'mode-selection'; course: Course; chapter: Chapter }
  | { screen: 'quiz'; course: Course; chapter: Chapter; mode: QuizMode };

const App: React.FC = () => {
  const [navState, setNavState] = useState<NavigationState>({ screen: 'course-selection' });

  const handleSelectCourse = (course: Course) => {
    setNavState({ screen: 'chapter-selection', course });
  };

  const handleSelectChapter = (course: Course, chapter: Chapter) => {
    setNavState({ screen: 'mode-selection', course, chapter });
  };

  const handleSelectMode = (course: Course, chapter: Chapter, mode: QuizMode) => {
    setNavState({ screen: 'quiz', course, chapter, mode });
  };

  const handleBackToCourses = () => {
    setNavState({ screen: 'course-selection' });
  };

  const handleBackToChapters = (course: Course) => {
    setNavState({ screen: 'chapter-selection', course });
  };

  const handleBackToModes = (course: Course, chapter: Chapter) => {
    setNavState({ screen: 'mode-selection', course, chapter });
  };

  // Course Selection Screen
  if (navState.screen === 'course-selection') {
    return <CourseSelection courses={courses} onSelectCourse={handleSelectCourse} />;
  }

  // Chapter Selection Screen
  if (navState.screen === 'chapter-selection') {
    return (
      <ChapterSelection
        course={navState.course}
        onSelectChapter={(chapter) => handleSelectChapter(navState.course, chapter)}
        onBack={handleBackToCourses}
      />
    );
  }

  // Mode Selection Screen
  if (navState.screen === 'mode-selection') {
    return (
      <ModeSelection
        course={navState.course}
        chapter={navState.chapter}
        onSelectMode={(mode) => handleSelectMode(navState.course, navState.chapter, mode)}
        onBack={() => handleBackToChapters(navState.course)}
      />
    );
  }

  // Quiz Screen
  if (navState.screen === 'quiz') {
    return (
      <div className="min-h-screen bg-gray-50 pb-4">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-2 text-sm">EK</span>
              {navState.course.name} - {navState.chapter.name}
            </h1>
          </div>
        </header>
        <main>
          <QuizGame
            mode={navState.mode}
            chapterData={navState.chapter.data}
            onExit={() => handleBackToModes(navState.course, navState.chapter)}
          />
        </main>
      </div>
    );
  }

  return null;
};

export default App;
