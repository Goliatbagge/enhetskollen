import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhysicsItem, QuizMode } from '../types';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizGameProps {
  mode: QuizMode;
  chapterData: PhysicsItem[];
  onExit: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ mode, chapterData, onExit }) => {
  // Queue of items to ask.
  const [queue, setQueue] = useState<PhysicsItem[]>([]);
  // Items successfully answered (for progress tracking).
  const [completedCount, setCompletedCount] = useState(0);
  // Total unique items (for progress bar calculation).
  const [totalItems] = useState(chapterData.length);

  // Game state
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize queue on mount
  useEffect(() => {
    // Shuffle logic
    const shuffled = [...chapterData].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
  }, [chapterData]);

  const currentItem = queue[0];

  // Helper to determine what text to show based on mode
  const getQuestionText = (item: PhysicsItem) => {
    return mode === QuizMode.QUANTITY_TO_UNIT ? item.quantity : item.symbol;
  };

  const getCorrectAnswerText = (item: PhysicsItem) => {
    return mode === QuizMode.QUANTITY_TO_UNIT ? item.unitShort : item.quantity;
  };

  // Generate options for the current item
  const options = useMemo(() => {
    if (!currentItem) return [];

    const correct = getCorrectAnswerText(currentItem);

    // Get all unique potential answers from the dataset
    const allPotentialAnswers = Array.from(new Set(
      chapterData.map(item => getCorrectAnswerText(item))
    ));

    // Filter out the correct answer from distractors
    const distractors = allPotentialAnswers
      .filter(ans => ans !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Combine and shuffle
    return [correct, ...distractors].sort(() => Math.random() - 0.5);
  }, [currentItem, mode, chapterData]);

  const handleAnswerClick = (answer: string) => {
    if (isAnimating || !currentItem) return;

    setSelectedAnswer(answer);
    const correctAnswer = getCorrectAnswerText(currentItem);
    const isCorrect = answer === correctAnswer;

    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    setIsAnimating(true);

    // Delay to show feedback before "rolling"
    setTimeout(() => {
      handleNext(isCorrect);
    }, 1000);
  };

  const handleNext = (wasCorrect: boolean) => {
    const current = queue[0];
    const remaining = queue.slice(1);

    if (wasCorrect) {
      setCompletedCount(prev => prev + 1);

      if (remaining.length === 0) {
        setIsFinished(true);
      } else {
        setQueue(remaining);
      }
    } else {
      // If incorrect, put it back at the end of the queue
      setQueue([...remaining, current]);
    }

    // Reset UI state
    setSelectedAnswer(null);
    setAnswerStatus(null);
    setIsAnimating(false);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white rounded-2xl shadow-xl max-w-md mx-auto mt-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-100 p-4 rounded-full mb-6"
        >
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Bra jobbat!</h2>
        <p className="text-gray-600 mb-8">Nu kan du det här! Du har klarat alla frågor.</p>
        <div className="flex flex-col gap-3 w-full">
          <Button onClick={() => window.location.reload()} fullWidth>Öva igen</Button>
          <Button variant="ghost" onClick={onExit} fullWidth>Tillbaks till menyn</Button>
        </div>
      </div>
    );
  }

  if (!currentItem) return null;

  // Constants for wheel geometry
  const WHEEL_RADIUS_PX = 600;
  // We place the pivot point far below the text to create a gentle arc
  const PIVOT_Y = WHEEL_RADIUS_PX;

  return (
    <div className="max-w-md mx-auto mt-2 p-4 pt-2">
      <div className="flex justify-between items-center mb-2">
        <Button variant="ghost" onClick={onExit} className="!px-2 !py-1 text-sm">
          Avsluta
        </Button>
        <span className="text-sm font-medium text-gray-500">
          {completedCount} / {totalItems} klarade
        </span>
      </div>

      <ProgressBar current={completedCount} total={totalItems} />

      {/* Wheel / Question Area */}
      <div className="relative h-48 w-full overflow-hidden flex justify-center items-start mb-2">

        {/* The Wheel Arc Background */}
        <motion.div
            className="absolute border-4 border-gray-300 border-dashed rounded-full z-0"
            style={{
                width: WHEEL_RADIUS_PX * 2,
                height: WHEEL_RADIUS_PX * 2,
                top: 35,
            }}
            animate={{ rotate: isAnimating ? -20 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* The Text Container animating along the arc */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentItem.id}
            className="absolute top-[70px] z-10 flex flex-col items-center justify-center w-full"
            style={{
                transformOrigin: `50% ${PIVOT_Y}px`,
                height: 100
            }}
            initial={{
                rotate: 25,
                opacity: 0,
                x: 100
            }}
            animate={{
                rotate: 0,
                opacity: 1,
                x: 0
            }}
            exit={{
                rotate: -25,
                opacity: 0,
                x: -100
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 1
            }}
          >
            <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center font-mono-physics tracking-tight drop-shadow-sm whitespace-nowrap">
                {getQuestionText(currentItem)}
                </h1>
            </div>
            <div className="mt-2 text-xs font-bold tracking-wider text-indigo-400 uppercase bg-white/50 px-2 py-1 rounded">
              {mode === QuizMode.QUANTITY_TO_UNIT ? 'Välj enhet' : 'Välj storhet'}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Answer Buttons */}
      <div className="grid grid-cols-2 gap-3 w-full relative z-20">
        {options.map((option, idx) => {
        let btnStyle = "bg-white hover:bg-gray-50 text-gray-800 border-gray-200";

        if (answerStatus && selectedAnswer === option) {
            if (answerStatus === 'correct') {
                btnStyle = "bg-green-500 text-white border-green-600 ring-2 ring-green-300 shadow-green-200";
            } else {
                btnStyle = "bg-red-500 text-white border-red-600 ring-2 ring-red-300 shadow-red-200";
            }
        } else if (answerStatus && option === getCorrectAnswerText(currentItem)) {
            if (answerStatus === 'incorrect') {
                    btnStyle = "bg-green-100 text-green-800 border-green-300 opacity-70";
            }
        }

        return (
            <motion.button
            key={`${currentItem.id}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnimating}
            className={`
                ${btnStyle}
                p-2 sm:p-4 rounded-xl font-semibold text-base sm:text-lg border-b-4 shadow-sm transition-all
                flex items-center justify-center min-h-[60px] text-center break-words font-mono-physics leading-tight
            `}
            >
            {option}
            </motion.button>
        );
        })}
      </div>

      {/* Feedback Overlay Area - Compacted */}
      <div className="h-12 mt-4 flex justify-center items-center">
         <AnimatePresence>
            {answerStatus === 'incorrect' && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center text-red-600 font-bold bg-red-50 px-4 py-2 rounded-full shadow-sm border border-red-100 text-sm"
                >
                    <XCircle className="w-5 h-5 mr-2" />
                    Fel, den kommer igen!
                </motion.div>
            )}
            {answerStatus === 'correct' && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full shadow-sm border border-green-100 text-sm"
                >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Rätt svar!
                </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};
