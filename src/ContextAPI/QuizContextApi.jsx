import React, { createContext, useState, useContext, useEffect } from 'react'

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizObj, setQuizObj] = useState([]);

  useEffect(() => {
    // console.log("quizObj quizObj ", quizObj);
  },[quizObj])

  const initialState={
    quizObj: quizObj,
    setQuizObj: setQuizObj
  }

  return (
    <QuizContext.Provider value={initialState}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
    return useContext(QuizContext);
  };

