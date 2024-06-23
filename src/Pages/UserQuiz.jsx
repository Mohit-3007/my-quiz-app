import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ResultModal from "../Components/ResultModal";

const UserQuiz = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [localQuiz, setLocalQuiz] = useState(); // complete quiz details, questions and options
  const [quesNumber, setQuesNumber] = useState(null);
  const [quizData, setQuizData] = useState({}); // single quiz question detais, options and answer
  const [userQuizReport, setUserQuizReport] = useState({});
  const [optionClicked, setOptionClicked] = useState(false);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const cardColor = [
    { id: 1, color: "#2D70AE", darkBgColor: "rgb(52,122,194)" },
    { id: 2, color: "#2D9DA6", darkBgColor: "rgb(49,175,186)" },
    { id: 3, color: "#EFA929", darkBgColor: "rgb(238,178,67)" },
    { id: 4, color: "#D5546D", darkBgColor: "rgb(217,104,124)" },
    { id: 5, color: "#9A4292", darkBgColor: "rgb(158,56,152)" },
  ];

  // fetching quiz from local storage
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("QuizLocalData")) || [];
    const quizObj = localData.find((e) => {
      return e.id == params.id;
    });
    // console.log("quizObj ", quizObj)
    setLocalQuiz(quizObj);
  }, []);
  // runs when question Number changes
  useEffect(() => {
    if (!quesNumber) {
      console.log("in if quesNumber ", quesNumber);
      const { userObj } = fetchCurrentUser();
      const userQuiz = userObj.pendingQuiz.find((e) => {
        return e.id === Number(params.id);
      });
      if (userQuiz?.lastAttempt === userQuiz?.totalQuestion)
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
  // fetch logged In user details from local storage
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
  // quiz options click function handler
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
  //
  useEffect(() => {
    if (optionClicked) {
      const { userObj, usersData, loginUser } = fetchCurrentUser();
      const isAllQuesAttempted = handleIsAllQuestionAttempted();
      if (isAllQuesAttempted) {
        handleRemoveQuizObj();
        handleUpdateAttemptedQuiz();
        return setShowQuizResult(true);
        // return navigate("/user/dashboard");
      }
      const updatedPendingQuiz = userObj.pendingQuiz.map((curr) => {
        if (curr?.id === Number(params.id)) {
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
      setQuesNumber((prev) => prev + 1);
      setIsLoading(true);
      skeletonLoaderTimeOut(2000);
    }
  }, [userQuizReport]);
  // update Attempted Quiz array object once all question are attempted
  function handleUpdateAttemptedQuiz() {
    const { userObj, usersData, loginUser } = fetchCurrentUser();
    const completedQuiz = { ...userQuizReport };
    const totalScore = completedQuiz.quizData.reduce(
      (accumulator, currentValue, index) => {
        if (index == 0) return accumulator;
        return accumulator + currentValue.answerPoint;
      },
      0
    );
    completedQuiz.totalScore = totalScore;
    userObj.attemptedQuiz.push(completedQuiz);
    const usersDataNew = usersData.filter((e) => {
      return e.id != loginUser;
    });
    usersDataNew.push(userObj);
    localStorage.setItem("UsersData", JSON.stringify(usersDataNew));
  }
  // remove quiz object from pending quiz object once all question attempted
  function handleRemoveQuizObj() {
    const { userObj, usersData, loginUser } = fetchCurrentUser();
    const updatedPendingQuiz = userObj.pendingQuiz.filter((curr) => {
      return curr?.id !== Number(params.id);
    });
    console.log("updatedPendingQuiz ", updatedPendingQuiz);
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
    <div className="w-screen h-screen overflow-hidden scrollbar-hide relative ">
      {/* header */}
      <header className="py-2 px-4 flex items-center justify-between">
        {/* back button */}
        <button
          className="w-8 h-8 flex rounded-md justify-center items-center bg-[#F2F2F2]"
          onClick={() => navigate(-1)}
        >
          <IoChevronBackSharp />
        </button>

        <div
          className={
            "rounded-md tracking-wider text-3xl text-center duration-500 ease-in-out transition-all " +
            "bg-quiz-200 font-bold text-quiz-600 w-40 px-3 py-1 " +
            (isLoading && quesNumber <= 1 ? "skeleton h-7 box-content" : " ")
          }
        >
          {isLoading && quesNumber <= 1 ? "" : localQuiz?.title}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-fit ">
            <button
              className={
                "w-full py-1.5 px-4 flex justify-center items-center text-lg rounded-md font-semibold bg-[#F2F2F2] " +
                (isLoading ? "skeleton h-10 min-w-[5.875rem]" : " ")
              }
            >
              <span className="">
                {isLoading
                  ? ""
                  : userQuizReport?.quizData[quesNumber]?.points != undefined
                  ? `${userQuizReport?.quizData[quesNumber]?.points} Points`
                  : " "}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* main */}
      <main className="w-full h-[calc(100vh-48px)] box-border">
        {/* quiz question container */}
        <section className="w-full h-[calc(100%-48px)] overflow-y-auto scrollbar-hide bg-[#E5E5E5] px-8 py-4">
          <div className="w-full flex justify-center">
            <div className="w-[1064px] h-[470px] max-h-fit bg-[#461A42] rounded-2xl">
              <section className="p-4 w-full h-full">
                {/* loader container */}
                {isLoading && (
                  <div className="w-full h-full skeleton bg-[#461A42] rounded-lg overflow-hidden border border-quiz-400"></div>
                )}

                {!isLoading && (
                  <>
                    {/* question div */}
                    <div className="w-full h-[160px] mb-4">
                      <div className=" relative border rounded-lg h-full flex items-center w-full border-quiz-400 ">
                        <div className="w-full h-12 absolute top-0 left-0 px-4 py-4">
                          <div className="w-fit rounded-md py-1 px-2 font-poppins tracking-wider text-quiz-700 font-semibold bg-quiz-300">
                            {quesNumber && quesNumber}/
                            {userQuizReport?.totalQuestion}
                          </div>
                        </div>
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
                                cardColor={cardColor}
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

      {/* Result Modal */}
      {showQuizResult && <ResultModal quizResult={true} />}
    </div>
  );
};

function OptionCard({ index, option, handleClickOptionCard, cardColor }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      key={index}
      style={{
        backgroundColor: isHovered
          ? cardColor[index].darkBgColor
          : cardColor[index].color,
      }}
      className={`relative rounded-lg h-full max-h-full overflow-y-auto overflow-x-hidden flex 
      flex-row-everse md:flex-col gap-2 p-1 `}
      onClick={() => handleClickOptionCard(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
