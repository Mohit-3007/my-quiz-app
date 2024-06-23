import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import ResultModal from "../Components/ResultModal";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [localQuizData, setLocalQuizData] = useState();
  const [userObject, setUserObject] = useState();
  const [showQuizScore, setShowQuizScore] = useState(false);
  const [quizId, setQuizId] = useState();

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("QuizLocalData")) || [];
    setLocalQuizData(localData);
  }, []);

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("UsersData"));
    const loginUser = JSON.parse(localStorage.getItem("Login"));
    const userObj = usersData.find((e) => {
      return e.id === loginUser;
    });
    setUserObject(userObj);
  }, []);

  useEffect(() => {
    if (localQuizData) console.log("localQuizData ", localQuizData);
  }, [localQuizData]);

  function handleTakeQuiz(data, index) {
    const usersData = JSON.parse(localStorage.getItem("UsersData"));
    const loginUser = JSON.parse(localStorage.getItem("Login"));

    usersData.forEach((user) => {
      if (user.id === loginUser) {
        data.lastAttempt = 0;
        data.totalQuestion = data?.quizData.length - 1;
        const pendingQuizs = user?.pendingQuiz;
        if (pendingQuizs.length > 0) {
          const isPresent = pendingQuizs.find((e) => {
            return e?.id === data?.id;
          });
          if (!isPresent) pendingQuizs.push(data);
          return;
        }
        pendingQuizs.push(data);
      }
    });
    localStorage.setItem("UsersData", JSON.stringify(usersData));
    navigate(`/user/quiz/${data?.id}`);
  }

  function handleLogout() {
    localStorage.removeItem("Login");
    navigate("/login");
  }

  function handleViewScore(data, index) {
    setQuizId(data?.id);
    setShowQuizScore(true);
  }

  function handleCloseResultModal() {
    setShowQuizScore(false);
  }

  return (
    <div className="bg-slate-100 w-screen h-screen  ">
      {/* navbar */}
      <nav className="w-full flex justify-between items-center py-3 px-5 500-s:py-5 500-s:px-7">
        <img
          src={logo}
          className="max-400-s:w-[120px] max-400-s:h-[40px] max-500-s:w-[150px] max-500-s:h-[50px] w-[225px] h-[72px] transition-all ease-linear duration-500"
          alt="logo"
        />
        <button
          onClick={handleLogout}
          className="py-1.5 px-3 400-s:py-2 400-s:px-4 500-s:py-3 500-s:px-6 mr-5 rounded-xl hover:scale-110 duration-300 hover:tracking-wide font-poppins 
          text-base 400-s:text-xl 500-s:text-2xl font-bold bg-quiz-400 text-white hover:bg-quiz-300 hover:text-quiz-900 "
        >
          Logout
        </button>
      </nav>

      {/* main */}
      <section className="w-full h-[calc(100vh-112px)] overflow-x-hidden overflow-y-auto scrollbar-hide bg-quiz-500 p-10">
        <div className="flex flex-col items-center justify-center mx-auto">
          <h1 className="text-4xl font-semibold tracking-wider font-quicksand w-full text-center text-white">
            Welcome to Your
            <span className="text-[#EFA929]"> Quiz Portal</span>
          </h1>
          <p
            className="text-white font-quicksand font-medium text-center text-base transition-all ease-linear duration-300
            mt-4 tracking-wide 830-s:tracking-wider 830-s:text-xl max-830-s:w-[80vw] mb-3"
          >
            Select a Quiz to Begin Your Journey
          </p>

          <table className="w-3/4 text-black bg-[#E5E5E5] rounded-xl overflow-hidden">
            <thead className="w-full font-poppins tracking-wide text-corn-600 border-b border-black border-opacity-50 shadow-sm">
              <tr>
                <th className="py-2 px-2 text-2xl">Sr no.</th>
                <th className="py-2 px-2 text-2xl">Quiz Title</th>
                <th className="py-2 px-2 text-2xl">Questions</th>
                <th className="py-2 px-2 text-2xl">Total Points</th>
                <th className="py-2 px-2 text-2xl"></th>
              </tr>
            </thead>
            <tbody className="font-poppins">
              {localQuizData &&
                localQuizData.map((data, index) => {
                  return (
                    <tr key={index} className="text-center hover:bg-quiz-300">
                      <td className="py-3 text-xl">{index + 1}</td>
                      <td className="py-3 text-xl">{data?.title}</td>
                      <td className="py-3 text-xl">
                        {data.quizData.length - 1}
                      </td>
                      <td className="py-3 text-xl">{data.totalPoints}</td>
                      <td className="py-3 text-xl cursor-pointer">
                        <RenderActionButton
                          index={index}
                          data={data}
                          userObject={userObject}
                          handleTakeQuiz={handleTakeQuiz}
                          handleViewScore={handleViewScore}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>

      {/* quiz View/Result Modal  */}
      {showQuizScore && (
        <ResultModal
          viewScore={true}
          onClose={handleCloseResultModal}
          quizId={quizId}
        />
      )}
    </div>
  );
};

function RenderActionButton({
  index,
  data,
  userObject,
  handleTakeQuiz,
  handleViewScore,
}) {
  const [takeQuiz, setTakeQuiz] = useState(false);
  const [continueQuiz, setContinueQuiz] = useState(false);
  const [viewScore, setViewScore] = useState(false);

  useEffect(() => {
    const isPending = userObject.pendingQuiz.find((e) => {
      return e?.id === data?.id;
    });
    if (isPending) return setContinueQuiz(true);

    const isAttempted = userObject?.attemptedQuiz.find((e) => {
      return e?.id === data?.id;
    });
    if (isAttempted) return setViewScore(true);
    setTakeQuiz(true);
  }, []);

  return (
    <>
      {takeQuiz && (
        <button
          onClick={() => handleTakeQuiz(data, index)}
          className="px-2 py-1 bg-corn-100 rounded-md duration-300 ease-linear hover:scale-110"
        >
          Take Quiz
        </button>
      )}

      {continueQuiz && (
        <button
          onClick={() => handleTakeQuiz(data, index)}
          className="px-2 py-1 bg-corn-100 rounded-md duration-300 ease-linear hover:scale-110"
        >
          Continue Quiz
        </button>
      )}

      {viewScore && (
        <button
          onClick={() => handleViewScore(data, index)}
          className="px-2 py-1 bg-corn-100 rounded-md duration-300 ease-linear hover:scale-110"
        >
          View Score
        </button>
      )}
    </>
  );
}

export default UserDashboard;
