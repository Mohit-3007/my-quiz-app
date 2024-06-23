import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { RxCross2, RxCheck } from "react-icons/rx";
import { useQuizContext } from "../ContextAPI/QuizContextApi";
import { useNavigate, useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const ResultModal = ({
  quizResult = false,
  viewScore = false,
  onClose,
  quizId,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const { quizObj, setQuizObj } = useQuizContext();

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("UsersData"));
    const loginUser = JSON.parse(localStorage.getItem("Login"));
    const userObj = usersData.find((e) => {
      return e.id === loginUser;
    });
    if (quizResult) {
      const result = userObj.attemptedQuiz.find((e) => {
        return e.id === Number(params.id);
      });
      setQuizObj(result);
    } else if (viewScore) {
      const result = userObj.attemptedQuiz.find((e) => {
        return e.id === quizId;
      });
      setQuizObj(result);
    }
  }, []);

  function handleReturnToDashBoard() {
    if (quizResult) {
      navigate("/user/dashboard");
    } else if (viewScore) {
      onClose();
    }
  }

  return (
    <div className="absolute top-0 w-screen h-screen bg-[#424040] bg-opacity-60 z-20">
      <div className="w-2/4 min-h-fit max-h-[90vh] mt-12 rounded-md bg-[#F2F2F2] mx-auto shadow-md shadow-[#a8a4a4]">
        {/* header */}
        <div className="w-full h-14 bg-white rounded-t-md flex item justify-between border-b shadow-sm border-[#E5E5E5] items-center px-4 py-3  ">
          {/* quiz title */}
          <h1 className="font-bold text-xl text-quiz-500 tracking-wider font-poppins">
            {quizObj?.title}
          </h1>

          {/* return to dashboard */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReturnToDashBoard}
              className="px-4 py-1 border flex items-center border-quiz-400 bg-quiz-100 rounded-md text-quiz-400
                hover:bg-quiz-400 hover:text-quiz-100 hover:border-quiz-100 duration-300"
            >
              <span className="font-semibold text-sm">
                Return to Dashboard{" "}
              </span>
            </button>
          </div>
        </div>

        {/* User Score Container */}
        <div className="w-full h-fit bg-white flex items-center py-2 px-3">
          <div className="w-[50%] text-3xl font-quicksand tracking-wide font-semibold text-corn-600 ">
            Your Score:-
          </div>
          <div className="w-[50%] text-2xl font-quicksand tracking-wide font-semibold text-corn-600">
            {quizObj?.totalScore} / {quizObj?.totalPoints}
          </div>
        </div>

        {/* questions preview */}
        <div className="w-full h-[calc(100%-56px-24px-52px]] max-h-[calc(90vh-56px-24px-52px)] overflow-y-auto scrollbar-hide">
          <div className="w-full h-full ">
            {quizObj &&
              quizObj?.quizData?.map((e, i) => {
                if (i != 0) {
                  return (
                    <QuizPreviewContainer
                      key={i}
                      data={e}
                      index={i}
                      quizObj={quizObj}
                    />
                  );
                }
              })}
          </div>
        </div>

        <div className="w-full h-6 bg-quiz-400 rounded-b-md"></div>
      </div>
    </div>
  );
};

function QuizPreviewContainer({ data, index, quizObj }) {
  const [inputReadOnly, setInputReadOnly] = useState(true);
  const [quizOption, setQuizOption] = useState(data?.options);

  useEffect(() => {
    setQuizOption(data.options);
  }, [data]);

  return (
    <div
      key={index}
      className="w-full h-fit p-4 bg-white border shadow-sm border-[#E5E5E5] mb-6"
    >
      {/* main */}
      <div className="w-full flex flex-col gap-4">
        {/* question */}
        <div className="text-black text-base flex gap-1 ">
          <span className="">Q {index}. </span>
          <div className="">{data?.ques}</div>
        </div>

        <div className="w-full h-fit">
          {/* options */}
          {quizOption.map((each, idx) => {
            return (
              <Options
                key={idx}
                idx={idx}
                each={each}
                data={data}
                quizOption={quizOption}
              />
            );
          })}
          {/* points and correct/incorrect answer */}
          <div className="w-full flex items-center justify-between px-2">
            <div>Points:- {data?.answerPoint}</div>
            <div
              className={
                " " +
                (data?.answerIdx === data?.selectedIdx
                  ? "text-[#2CA27A]"
                  : "text-[#D22D48]")
              }
            >
              {data?.answerIdx === data?.selectedIdx
                ? "Correct Answer"
                : "Incorrect Answer"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//

function Options({ idx, each, data, quizOption }) {
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [notCorrectAnswer, setNotCorrectAnswer] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(false);
  const [optionIdx, setOptionIdx] = useState(false);

  useEffect(() => {
    const isCorrectAnswerIdx = data?.answerIdx === idx;
    if (isCorrectAnswerIdx) {
      if (idx === data.selectedIdx) {
        setCorrectAnswer(true);
      } else {
        setRightAnswer(true);
      }
    } else {
      if (idx === data.selectedIdx) {
        setNotCorrectAnswer(true);
      } else {
        setOptionIdx(true);
      }
    }
  }, []);

  return (
    <div key={idx} className="w-full h-fit border mb-2.5">
      <div
        className={
          "w-full py-2 pl-2 pr-3 flex items-center " +
          (correctAnswer ? "bg-[#D9FCED]" : "") +
          (notCorrectAnswer ? "bg-[#FFE5E7]" : "") +
          (rightAnswer ? "bg-[#EDEFF3]" : "")
        }
      >
        {/* icons */}
        <div className="w-5 h-5 flex items-center justify-center ">
          {correctAnswer && (
            <IoMdCheckmark className="text-[#2CA27A] border border-[#2CA27A] rounded-sm " />
          )}
          {rightAnswer && (
            <IoMdCheckmark className="border border-[#23262A] rounded-sm text-[#23262A]" />
          )}
          {notCorrectAnswer && (
            <MdClose className="border border-[#D22D48] rounded-sm text-[#D22D48] " />
          )}
          {optionIdx && (
            <div className="w-full h-full flex items-center justify-center border border-[#E8EAEE] rounded-sm">
              {idx + 1}
            </div>
          )}
        </div>
        <div
          className={
            "ml-2.5 flex items-center " +
            (correctAnswer ? "text-[#2CA27A]" : "") +
            (notCorrectAnswer ? "text-[#D22D48]" : "") +
            (rightAnswer ? "text-[#23262A]" : "")
          }
        >
          {each}
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
