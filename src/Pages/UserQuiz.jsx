import { useParams, useSearchParams } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { IoChevronBackSharp, IoCheckmark } from "react-icons/io5";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useQuizContext } from "../ContextAPI/QuizContextApi";
import { useNavigate } from "react-router-dom";
import PreviewQuiz from "../Components/PreviewQuiz";
import { RiContrastDropLine } from "react-icons/ri";

const UserQuiz = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [localQuiz, setLocalQuiz] = useState(); // complete quiz details, questions and options
  const [quesNumber, setQuesNumber] = useState(null);
  const [quizData, setQuizData] = useState({}); // single quiz question detais, options and answer
  const [userQuizReport, setUserQuizReport] = useState({});
  const [optionClicked, setOptionClicked] = useState(false);

  // fetching quiz from local storage
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("QuizLocalData")) || [];
    const quizObj = localData.find((e) => {
      return e.id == params.id;
    });
    // console.log("quizObj ", quizObj)
    setLocalQuiz(quizObj);
  }, []);
  //
  useEffect(() => {
    if (!quesNumber) {
      console.log("in if quesNumber ", quesNumber);
      const { userObj } = fetchCurrentUser();
      const userQuiz = userObj.pendingQuiz.find((e) => {
        return e.id === Number(params.id);
      });
      if (userQuiz.lastAttempt === userQuiz.totalQuestion)
        navigate("/user/dashboard");
      setQuesNumber(userQuiz?.lastAttempt + 1);
    } else {
      console.log("else quesNumber ", quesNumber);
      setQuizData(localQuiz.quizData[quesNumber]);
    }
  }, [quesNumber]);
  // loader setTimeout
  useEffect(() => {
    skeletonLoaderTimeOut(3000);
  }, []);
  // loader function
  function skeletonLoaderTimeOut(duration) {
    const logTimeWithSeconds = () => {
      const now = new Date();
      console.log(now.toLocaleTimeString("en-US", { hour12: false })); // Logs time in hh:mm:ss format
    };
    // logTimeWithSeconds();
    setTimeout(() => {
      setIsLoading(false);
      // console.log(params);
      //   logTimeWithSeconds();
    }, duration);
  }
  function fetchCurrentUser() {
    const usersData = JSON.parse(localStorage.getItem("UsersData"));
    const loginUser = JSON.parse(localStorage.getItem("Login"));
    const userObj = usersData.find((e) => {
      return e.id === loginUser;
    });
    return {
      userObj,
      usersData,
      loginUser,
    };
  }
  // fetching current login user & quiz details
  useEffect(() => {
    const { userObj } = fetchCurrentUser();
    console.log("userObj ", userObj);
    const userQuiz = userObj.pendingQuiz.find((e) => {
      return e.id === Number(params.id);
    });
    console.log("userQuiz ", userQuiz);
    setUserQuizReport(userQuiz);
  }, []);

  function handleClickOptionCard(index) {
    setOptionClicked(true);
    const answerPoints = quizData?.answerIdx === index ? quizData.points : 0;
    const currentQues = { ...quizData };
    currentQues.answerPoint = answerPoints;
    currentQues.selectedIdx = index;
    setUserQuizReport((prev) => {
      const updatedQuizData = [...prev.quizData];
      updatedQuizData[quesNumber] = currentQues;
      return {
        ...prev,
        quizData: updatedQuizData,
        lastAttempt: quesNumber,
      };
    });
  }

  useEffect(() => {
    if (optionClicked) {
      const { userObj, usersData, loginUser } = fetchCurrentUser();
      const isAllQuesAttempted = handleIsAllQuestionAttempted();
      if (isAllQuesAttempted) {
        handleRemoveQuizObj(userObj, usersData, loginUser);
        handleUpdateAttemptedQuiz();
        return navigate("/user/dashboard");
      }

      const updatedPendingQuiz = userObj.pendingQuiz.map((curr) => {
        if (curr.id === Number(params.id)) {
          return userQuizReport; // Replace the object
        }
        return curr; // Keep the object unchanged
      });
      userObj.pendingQuiz = updatedPendingQuiz;
      console.log("after after after ", userObj);
      const usersDataNew = usersData.filter((e) => {
        return e.id != loginUser;
      });
      usersDataNew.push(userObj);
      localStorage.setItem("UsersData", JSON.stringify(usersDataNew));
      setOptionClicked(false);
      // const isAllQuesAttempted = handleIsAllQuestionAttempted();
      // if (isAllQuesAttempted) return navigate("/user/dashboard");
      setQuesNumber((prev) => prev + 1);
      setIsLoading(true);
      skeletonLoaderTimeOut(2000);
    }
  }, [userQuizReport]);

  // update Attempted Quiz array object once all question are attempted
  function handleUpdateAttemptedQuiz() {}

  // remove quiz object from pending quiz object once all question attempted
  function handleRemoveQuizObj(userObj, usersData, loginUser) {
    const updatedPendingQuiz = userObj.pendingQuiz.map((curr) => {
      if (curr.id !== Number(params.id)) {
        return curr;
      }
    });
    userObj.pendingQuiz = updatedPendingQuiz;
    const usersDataNew = usersData.filter((e) => {
      return e.id != loginUser;
    });
    usersDataNew.push(userObj);
    localStorage.setItem("UsersData", JSON.stringify(usersDataNew));
  }

  // check if all questions has been attempted or not
  function handleIsAllQuestionAttempted() {
    if (userQuizReport.lastAttempt === userQuizReport.totalQuestion)
      return true;
    return false;
  }

  return (
    <div className="w-screen h-screen overflow-hidden relative ">
      {/* header */}
      <header className="py-2 px-4 flex items-center justify-between">
        {/* back button */}
        <button className="w-8 h-8 flex justify-center items-center bg-[#F2F2F2]">
          <IoChevronBackSharp />
        </button>

        <div className="flex items-center gap-2">
          {/* question points */}
          {/* <div className="w-[100px] h-8">
              <button
                onClick={handleDropDown}
                className="w-full h-full px-2 flex justify-center items-center gap-1 text-xs rounded-md font-semibold bg-[#F2F2F2]"
              >
                <IoCheckmark />
                <span className="">{quizPoint} Points</span>
                {isDown === true ? <FaCaretUp /> : <FaCaretDown />}
              </button>
              <div
                className={
                  "w-full rounded-lg  mt-2 h-10 bg-gray-200  " +
                  (isDown === true ? "" : "hidden")
                }
              >
                <ul className="w-full h-[60vh] rounded-lg overflow-y-auto scrollbar-hide bg-inherit relative z-10 list-none ">
                  {Array.from({ length: 20 }, (_, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => handlePoints(i + 1)}
                        className="w-full h-8"
                      >
                        <button
                          className="w-full h-full px-2 py-1 flex justify-between items-center text-sm
                        font-semibold text-black hover:bg-[#EDE6F6] hover:text-[#8854C0]"
                        >
                          {i + 1} Points
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div> */}

          {/* preview Quiz */}
          {/* {quizObj.length > 1 && (
              <div className="w-[100px] h-8" onClick={handlePreviewModal}>
                <button
                  className="w-full h-full px-2 flex justify-center items-center gap-1 text-xs rounded-md font-semibold bg-[#F2F2F2]"
                >
                  Preview Quiz
                </button>
              </div>
            )} */}

          {/* save quiz */}
          {/* {quizObj.length > 2 && (
              <div
                onClick={handleSaveQuizToStorage}
                className="px-4 py-[6px] bg-quiz-400 rounded-md text-white hover:bg-quiz-300 hover:text-quiz-900 duration-500 cursor-pointer"
              >
                <div className="flex items-center gap-1 ">
                  <FaSave className=" text-sm" />
                  <span className=" text-xs font-semibold">Save Quiz</span>
                </div>
              </div>
            )} */}

          {/* save question */}
          <div className="px-4 py-[6px] bg-quiz-400 rounded-md text-white hover:bg-quiz-300 hover:text-quiz-900 duration-500 cursor-pointer">
            <div className="flex items-center gap-1 ">
              <FaSave className=" text-sm" />
              <span className=" text-xs font-semibold">Save questions</span>
            </div>
          </div>
        </div>
      </header>

      {/* main */}
      <main className="w-full h-[calc(100vh-48px)] box-border">
        {/* heading */}
        <header className="w-full h-fit px-4 bg-[#F9F9F9]">
          <div className="w-full h-full flex items-center gap-3">
            <h2 className="text-3xl text-black font-semibold tracking-wider py-2">
              Quiz Title
            </h2>
            <div
              className={
                "rounded-md tracking-wider text-xl text-center duration-500 ease-in-out transition-all " +
                "bg-quiz-200 text-quiz-600 w-40 px-3 py-1 " +
                (isLoading && quesNumber <= 1
                  ? "skeleton h-7 box-content"
                  : " ")
              }
            >
              {isLoading && quesNumber <= 1 ? "" : localQuiz?.title}
            </div>
          </div>
        </header>

        {/* quiz question container */}
        <section className="w-full h-[calc(100%-48px)] overflow-y-auto bg-[#E5E5E5] px-8 py-4">
          <div className="w-full flex justify-center">
            <div className="w-[1064px] h-[600px] bg-[#461A42] rounded-2xl">
              <section className="p-4 w-full h-full">
                {/* loader container */}
                {isLoading && (
                  <div className="w-full h-full skeleton bg-[#461A42] rounded-lg overflow-hidden border border-quiz-400"></div>
                )}

                {!isLoading && (
                  <>
                    {/* question div */}
                    <div className="w-full h-[15.3125rem] mb-4">
                      <div className="border rounded-lg h-full flex items-center w-full border-quiz-400 ">
                        <div className="w-full h-fit text-center">
                          <div className="p-2 rounded-md focus:outline-none text-xl font-quicksand text-white ">
                            {quizData?.ques}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* options cards container */}
                    <div className="w-full h-[262px] flex ">
                      <div className="h-full w-full gap-2 grid grid-flow-col auto-cols-fr">
                        {quizData &&
                          Array.isArray(quizData.options) &&
                          quizData.options.length > 0 &&
                          quizData?.options.map((e, index) => {
                            return (
                              <OptionCard
                                key={index}
                                index={index}
                                option={e}
                                handleClickOptionCard={handleClickOptionCard}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </>
                )}
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function OptionCard({ index, option, handleClickOptionCard }) {
  return (
    <div
      key={index}
      // style={{ backgroundColor: colorObj.color }}
      className="relative rounded-lg h-full max-h-full overflow-y-auto overflow-x-hidden border-2 flex 
      flex-row-reverse md:flex-col gap-2 p-1"
      onClick={() => handleClickOptionCard(index)}
    >
      {
        // <div className="flex flex-col md:flex-row md:justify-between gap-2">
        //   <button className="w-6 h-6 flex justify-center items-center mx-1 mt-1 text-white bg-[#F2F2F2] rounded bg-opacity-25
        //     hover:bg-opacity-50 duration-300">
        //     <MdOutlineDelete className="text-white text-base" />
        //   </button>
        //   <button
        //     onClick={handleMarkAsCorrectAnswer}
        //     className="w-6 h-6 mx-1 mt-1 flex justify-center items-center "
        //   >
        //     <IoIosCheckmarkCircleOutline
        //       className={
        //         "text-3xl " +
        //         (isCorrectOption === true ? "text-green-900" : "text-white")
        //       }
        //     />
        //   </button>
        // </div>
      }

      {/* main */}
      <div className="w-full h-full p-2 flex items-center rounded-lg ">
        <div className="w-full h-fit text-center flex items-center">
          <div className="w-full truncate text-center p-2 rounded-md text-xl font-quicksand text-white ">
            {option}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserQuiz;
