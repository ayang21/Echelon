'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ProgressState = {
  [moduleId: string]: {
    completedVideos: number[];
    quizCompleted: boolean;
  };
};

type ProgressContextType = {
  progressState: ProgressState;
  updateProgress: (moduleId: string, videoId?: number, quizCompleted?: boolean) => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progressState, setProgressState] = useState<ProgressState>({});

  const updateProgress = (moduleId: string, videoId?: number, quizCompleted?: boolean) => {
    setProgressState((prevState) => {
      const moduleProgress = prevState[moduleId] || { completedVideos: [], quizCompleted: false };

      return {
        ...prevState,
        [moduleId]: {
          completedVideos: videoId
            ? [...new Set([...moduleProgress.completedVideos, videoId])]
            : moduleProgress.completedVideos,
          quizCompleted: quizCompleted ?? moduleProgress.quizCompleted,
        },
      };
    });
  };

  return (
    <ProgressContext.Provider value={{ progressState, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};