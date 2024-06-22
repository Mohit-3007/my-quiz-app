import React, { useRef, useState, useEffect } from "react";
import { IoChevronBackSharp, IoCheckmark } from "react-icons/io5";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useQuizContext } from "../ContextAPI/QuizContextApi";
import { useNavigate } from "react-router-dom";
import PreviewQuiz from "../Components/PreviewQuiz";

const CreateQuiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDown, setIsDown] = useState(false);
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const contentDivRef = useRef(null);
  const placeholder = "Type your question here";
  const [divDarkBg, setDivDarkBg] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  const [renderCards, setRenderCards] = useState([]);
  const [nextCardIndex, setNextCardIndex] = useState(0);
  const [showPlace, setShowPlace] = useState(true);
  const [quizPoint, setQuizPoint] = useState(1);
  const [quizHeading, setQuizHeading] = useState("");
  const { quizObj, setQuizObj } = useQuizContext();
  const [openModal, setOpenModal] = useState(false);
  const [titleReadOnly, setTitleReadOnly] = useState(false);
  const [singleQuesData, setSingleQuesData] = useState({ques: "", options: [], answer: "", answerIdx: null, points: 1,});
  const cardColor = [
    { id: 1, color: "#2D70AE", darkBgColor: "rgb(26,60,90)" },
    { id: 2, color: "#2D9DA6", darkBgColor: "rgb(26,82,86)" },
    { id: 3, color: "#EFA929", darkBgColor: "rgb(123,88,24)" },
    { id: 4, color: "#D5546D", darkBgColor: "rgb(110,46,58)" },
    { id: 5, color: "#9A4292", darkBgColor: "rgb(80,37,76)" },
  ];

  useEffect(() => {
    const logTimeWithSeconds = () => {
      const now = new Date();
      console.log(now.toLocaleTimeString('en-US', { hour12: false })); // Logs time in hh:mm:ss format
    };
    logTimeWithSeconds();
    setTimeout(() => {
      setIsLoading(false);
      logTimeWithSeconds();
    }, 3000);
  }, []);

  useEffect(() => {
    setSingleQuesData((prev) => ({ ...prev, points: quizPoint }));
  }, [quizPoint]);

  useEffect(() => {
    const initialColors = [
      { id: 1, color: "#2D70AE", darkBgColor: "rgb(26,60,90)" },
      { id: 2, color: "#2D9DA6", darkBgColor: "rgb(26,82,86)" },
      { id: 3, color: "#EFA929", darkBgColor: "rgb(123,88,24)" },
      { id: 4, color: "#D5546D", darkBgColor: "rgb(110,46,58)" },
    ];
    setRenderCards(initialColors);
    setNextCardIndex(initialColors.length);
  }, []);

  useEffect(() => {
    if(quizObj[0] !== undefined){
      setTitleReadOnly(true);
    }else{
      setQuizHeading("")
    }
  },[quizObj])

  function handleAddOptionCard() {
    if (nextCardIndex < cardColor.length) {
      const newCard = cardColor[nextCardIndex];
      setRenderCards((prev) => [...prev, newCard]);
      setNextCardIndex((prev) => prev + 1);
    }
    if (nextCardIndex + 1 >= cardColor.length) {
      setShowAddButton(false);
    }
  }

  function handleDeleteOption(index) {
    if (renderCards.length > 2) {
      const newArr = cardColor.filter((_, i) => {
        if (i < renderCards.length - 1) {
          return i != renderCards.length - 1;
        }
      });
      setRenderCards(newArr);
      setNextCardIndex((prev) => prev - 1);
      setShowAddButton(true);
    }
  }

  useEffect(() => {
    if (content != "") {
      setShowPlace(false);
    } else if (content == "") {
      setShowPlace(true);
    }
    setSingleQuesData((prev) => ({
      ...prev,
      ques: content,
    }));
  }, [content]);

  const handleInput = (e) => {
    setContent(e.currentTarget.textContent);
  };
  // console.log(singleQuesData)
  function handleShowPlaceholder() {
    if (showPlace === true) setShowPlace(false);
  }

  function handleWindowClick(e) {
    if (!contentDivRef.current.contains(e.target)) {
      setDivDarkBg(false);
      // if(content != "") {
      //   console.log(content, " in window click");
      //   setShowPlace(false)
      // }else{
      //   setShowPlace(true);
      // }
    }
  }
  useEffect(() => {
    window.addEventListener("mousedown", handleWindowClick);
    return () => window.removeEventListener("mousedown", handleWindowClick);
  }, []);
  function handleDropDown() {
    setIsDown(!isDown);
  }
  const handleFocus = () => {
    if (contentRef.current) {
      setDivDarkBg(true);
      contentRef.current.focus();
    }
  };

  function handleSaveQuizQuestion() {
    console.log(singleQuesData);
    const { ques, options, answer, answerIdx } = singleQuesData;
    if (!quizHeading) return console.log("quiz heading is mandatory");
    if (ques === "") return console.log("Question is mandatory");

    const isEmpty = options.some((e) => e === "" || e === undefined);
    if (isEmpty) return console.log("option cannot be left empty");
    if (answerIdx === null) return console.log("Choose One Correct Answer");

    setSingleQuesData((prev) => ({ ...prev, answer: options[answerIdx] }));
    const quizObjArr = [];
    if (quizObj[0] === undefined) {
      quizObjArr[0] = quizHeading;
    }
    quizObjArr.push(singleQuesData);
    setQuizObj((prev) => [...prev, ...quizObjArr]);
    setSingleQuesData({ques: "", options: [], answer: "", answerIdx: null, points: 1,});
    contentRef.current.textContent = "";
    setQuizPoint(1);
    console.log("quiz question data added to context array");

  }

  function handleSaveQuizToStorage() {
    const quizLocalData = JSON.parse(localStorage.getItem("QuizLocalData")) || [];
    console.log("quizQuesData.length ", quizLocalData.length);
    const totalPoints = quizObj.reduce((accumulator, currentValue, index) => {
      if(index == 0) return accumulator;
      return accumulator + (currentValue.points || 0);
    },0)
    const quizLocalObj ={
      id: quizLocalData.length+1,
      title: quizObj[0],
      quizData: quizObj,
      totalPoints: totalPoints
    }
    quizLocalData.push(quizLocalObj);
    localStorage.setItem("QuizLocalData", JSON.stringify(quizLocalData));
    console.log("Qiz added to local storage");
    setQuizObj([]);
    setTitleReadOnly(false)

  }

  function handlePoints(point) {
    setIsDown(false)
    setQuizPoint(point);
  }

  function handlePreviewModal() {
    console.log("changing Modal view, ", openModal);
    setOpenModal(!openModal);
  }

  function handleTitleInputFocusOut(){
    if(quizObj[0] != undefined) {
      setTitleReadOnly(true);
      setQuizObj(prev => {
        const arr = [...prev];
        arr.splice(0,1,quizHeading);
        return arr;
      })
    }
  }

  function handleInputDoubleClick(){
    setTitleReadOnly(false);
  }

  return (
    <>
      {/* Create Quiz */}
      <div className="w-screen h-screen overflow-hidden relative ">
        {/* header */}
        <header className="py-2 px-4 flex items-center justify-between">
          {/* back button */}
          <button className="w-8 h-8 flex justify-center items-center bg-[#F2F2F2]">
            <IoChevronBackSharp />
          </button>

          <div className="flex items-center gap-2">

            {/* question points */}
            <div className="w-[100px] h-8">
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
            </div>

            {/* preview Quiz */}
            {quizObj.length > 1 && (
              <div className="w-[100px] h-8" onClick={handlePreviewModal}>
                <button
                  className="w-full h-full px-2 flex justify-center items-center gap-1 text-xs rounded-md font-semibold bg-[#F2F2F2]"
                >
                  Preview Quiz
                </button>
              </div>
            )}

            {/* save quiz */}
            {quizObj.length > 2 && (
              <div
                onClick={handleSaveQuizToStorage}
                className="px-4 py-[6px] bg-quiz-400 rounded-md text-white hover:bg-quiz-300 hover:text-quiz-900 duration-500 cursor-pointer"
              >
                <div className="flex items-center gap-1 ">
                  <FaSave className=" text-sm" />
                  <span className=" text-xs font-semibold">Save Quiz</span>
                </div>
              </div>
            )}

            {/* save question */}
            <div
              onClick={handleSaveQuizQuestion}
              className="px-4 py-[6px] bg-quiz-400 rounded-md text-white hover:bg-quiz-300 hover:text-quiz-900 duration-500 cursor-pointer"
            >
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
              <input
                onChange={(e) => setQuizHeading(e.target.value)}
                onDoubleClick={handleInputDoubleClick}
                onBlur={handleTitleInputFocusOut}
                type="text"
                readOnly={titleReadOnly}
                value={quizHeading}
                className={"border-none focus:outline-none focus:border-none rounded-md tracking-wider text-xl " 
                  + (titleReadOnly ? 'bg-transparent text-center duration-500 ease-in-out transition-all bg-quiz-200 text-quiz-600 w-40 px-3 py-1 ' 
                    : 'bg-[#F2F2F2] w-72 duration-500 ease-in-out transition-all px-3 py-1 ') + (isLoading ? "skeleton" : " ")}
              />
        
            </div>
          </header>

          {/* quiz question container */}
          <section className="w-full h-[calc(100%-48px)] overflow-y-auto bg-[#E5E5E5] px-8 py-4">
            <div className="w-full flex justify-center">
              <div className="w-[1064px] h-[600px] bg-[#461A42] rounded-2xl">
                <section className="p-4 w-full h-full">

                  {/* loading state */}
                  {isLoading && (
                    <div className="w-full h-full skeleton bg-[#461A42] rounded-lg overflow-hidden border border-quiz-400"></div>
                  )}

                  {!isLoading && (
                    <>
                      {/* question div */}
                      <div className="w-full h-[15.3125rem] mb-4">
                        <div
                          ref={contentDivRef}
                          name="parent"
                          className={
                            "border rounded-lg h-full flex items-center w-full " +
                            (divDarkBg === true
                              ? "bg-[rgb(39,17,37)] border-[rgb(136,84,192)]"
                              : "border-quiz-400")
                          }
                          onClick={handleFocus}
                        >
                          <div className="w-full h-fit text-center">
                            <div
                              ref={contentRef}
                              className="p-2 rounded-md focus:outline-none text-xl font-quicksand text-white "
                              contentEditable="true"
                              onClick={() => handleShowPlaceholder()}
                              onInput={handleInput}
                              suppressContentEditableWarning={true}
                            >
                              {showPlace === true && (
                                <div className="p-2 pointer-events-none text-gray-400">
                                  {placeholder}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* options cards container */}
                      <div className="w-full h-[262px] flex ">
                        <div className="h-full w-full gap-2 grid grid-flow-col auto-cols-fr">
                          {renderCards &&
                            renderCards.map((e, index) => {
                              return (
                                <OptionCard
                                  key={index}
                                  index={index}
                                  colorObj={e}
                                  renderCards={renderCards}
                                  handleDeleteOption={handleDeleteOption}
                                  singleQuesData={singleQuesData}
                                  setSingleQuesData={setSingleQuesData}
                                />
                              );
                            })}
                        </div>
                        <div
                          onClick={handleAddOptionCard}
                          className={
                            "w-7 h-full bg-yellow-300 " +
                            (showAddButton === false ? "hidden" : "block")
                          }
                        ></div>
                      </div>
                    </>
                  )}

                </section>
              </div>
            </div>
          </section>
        </main> 

        {/* Preview Quiz Modal */}
        {openModal && (
          <PreviewQuiz handlePreviewModal={handlePreviewModal} />
        )}
      </div>
    </>
  );
};

function OptionCard({
  index,
  colorObj,
  renderCards,
  handleDeleteOption,
  singleQuesData,
  setSingleQuesData,
}) {
  const [optionContent, setOptionContent] = useState(
    singleQuesData.options[index]
  );
  const optionRef = useRef(null);
  const optionDivRef = useRef(null);
  const [divDarkBg, setDivDarkBg] = useState(false);
  const [isCorrectOption, setIsCorrectOption] = useState(false);

  useEffect(() => {
    const isOption = singleQuesData.options[index];
    setOptionContent(isOption);
  }, [renderCards]);

  function handleMarkAsCorrectAnswer() {
    let correctAns = singleQuesData.options[index];
    if (correctAns == undefined || correctAns.length === 0)
      return console.log("type ypur answer first");
    setSingleQuesData((prev) => ({ ...prev, answerIdx: index }));
  }

  useEffect(() => {
    if (singleQuesData.answerIdx === index) setIsCorrectOption(true);
    else setIsCorrectOption(false);
    if (singleQuesData.options.length == 0) {
      setOptionContent("");
    }
  }, [singleQuesData]);

  function handleDeleteButton() {
    if (isCorrectOption) {
      setIsCorrectOption(false);
      setSingleQuesData((prev) => ({ ...prev, answerIdx: null }));
    }

    let existingOptions = singleQuesData.options.filter((_, i) => i != index);
    setOptionContent("");
    setSingleQuesData((prev) => ({
      ...prev,
      options: existingOptions,
    }));
    handleDeleteOption(index);
  }
  // console.log(optionContent, " " , index + 1)
  useEffect(() => {
    if (optionContent == "" && isCorrectOption == true) {
      setIsCorrectOption(false);
      setSingleQuesData((prev) => ({ ...prev, answerIdx: null }));
    }
    let existingOptions = singleQuesData.options;
    existingOptions[index] = optionContent;
    setSingleQuesData((prev) => ({
      ...prev,
      options: existingOptions,
    }));
  }, [optionContent]);

  function handleOptionInput(e) {
    setOptionContent(e.target.value);
  }

  function handleWindowClick(e) {
    if (!optionDivRef.current.contains(e.target)) {
      setDivDarkBg(false);
    }
  }
  useEffect(() => {
    window.addEventListener("mousedown", handleWindowClick);
    return () => window.removeEventListener("mousedown", handleWindowClick);
  }, []);
  const handleFocus = () => {
    if (optionRef.current) {
      setDivDarkBg(true);
      optionRef.current.focus();
    }
  };

  return (
    <div
      key={index}
      style={{ backgroundColor: colorObj.color }}
      className="relative rounded-lg h-full max-h-full overflow-y-auto overflow-x-hidden flex flex-row-reverse md:flex-col gap-2 p-1"
    >
      {/* header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        {/* delete option */}
        <button
          onClick={() => handleDeleteButton()}
          className="w-6 h-6 flex justify-center items-center mx-1 mt-1 text-white bg-[#F2F2F2] rounded bg-opacity-25
           hover:bg-opacity-50 duration-300"
        >
          <MdOutlineDelete className="text-white text-base" />
        </button>
        {/* mark as correct answer */}
        <button
          onClick={handleMarkAsCorrectAnswer}
          className="w-6 h-6 mx-1 mt-1 flex justify-center items-center "
        >
          <IoIosCheckmarkCircleOutline
            className={
              "text-3xl " +
              (isCorrectOption === true ? "text-green-900" : "text-white")
            }
          />
        </button>
      </div>

      {/* main */}
      <div
        ref={optionDivRef}
        style={
          divDarkBg === true ? { backgroundColor: colorObj.darkBgColor } : {}
        }
        className="w-full h-full p-2 flex items-center rounded-lg "
        onClick={handleFocus}
      >
        <div
          ref={optionRef}
          className="w-full h-fit text-center flex items-center"
        >
          <textarea
            type="text"
            placeholder="Type your answer here"
            value={optionContent}
            onChange={handleOptionInput}
            rows={4}
            style={{ outline: "none" }}
            className="w-full truncate text-center p-2 rounded-md text-xl focus:border-none focus:outline-none font-quicksand
             border-none outline-none text-white bg-transparent resize-none whitespace-pre-wrap "
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
