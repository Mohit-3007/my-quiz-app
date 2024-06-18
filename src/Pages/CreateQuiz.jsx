import React, { useRef, useState, useEffect } from "react";
import { IoChevronBackSharp, IoCheckmark } from "react-icons/io5";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const CreateQuiz = () => {
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
  // console.log("First")
  const [singleQuesData, setSingleQuesData] = useState({
    ques: "",
    options: [],
    answer: ""
  })
  const cardColor = [
    { id: 1, color: "#2D70AE", darkBgColor: "rgb(26,60,90)" },
    { id: 2, color: "#2D9DA6", darkBgColor: "rgb(26,82,86)" },
    { id: 3, color: "#EFA929", darkBgColor: "rgb(123,88,24)" },
    { id: 4, color: "#D5546D", darkBgColor: "rgb(110,46,58)" },
    { id: 5, color: "#9A4292", darkBgColor: "rgb(80,37,76)" },
  ];
  // let dargbg= [rgb(26,60,90), rgb(26,82,86), rgb(123,88,24), rgb(110,46,58), rgb(80,37,76) ]

  useEffect(() => {
    let length = renderCards.length;
    
  },[renderCards])

  useEffect(() => {
    const initialColors = [
      { id: 1, color: "#2D70AE", darkBgColor: "rgb(26,60,90)" },
      { id: 2, color: "#2D9DA6", darkBgColor: "rgb(26,82,86)" },
      // { id: 3, color: "#EFA929", darkBgColor: "rgb(123,88,24)" },
      // { id: 4, color: "#D5546D", darkBgColor: "rgb(110,46,58)" },
    ];
    setRenderCards(initialColors);
    setNextCardIndex(initialColors.length);
  }, []);

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

  function handleDeleteOption(index){
    if (renderCards.length > 2) {
      const newArr = cardColor.filter((_, i) => {
        if(i < renderCards.length - 1){
          return i != renderCards.length - 1
        }
      })
      setRenderCards(newArr);
      setNextCardIndex((prev) => prev - 1);
      setShowAddButton(true);
    }
  }

  useEffect(() => {
    if(content != "") {
      setShowPlace(false)
    }else if(content == ""){
      setShowPlace(true)
    }
    // console.log("updating question state");
    setSingleQuesData((prev) => ({
      ...prev,
      ques: content
    }))
  },[content])

  const handleInput = (e) => {
    setContent(e.currentTarget.textContent);
  };

  // console.log(singleQuesData)

  function handleShowPlaceholder(){
    if(showPlace === true) setShowPlace(false)
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

  // console.log("last ", content);
  // if(content != "" ) setShowPlace(false);
  // else if(content == "") setShowPlace(true); 

  return (
    <div className="w-screen h-screen overflow-hidden ">
      {/* header */}
      <header className="py-2 px-4 flex items-center justify-between">
        <button className="w-8 h-8 flex justify-center items-center bg-[#F2F2F2]">
          <IoChevronBackSharp />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-[92px] h-8">
            <button
              onClick={handleDropDown}
              className="h-full px-2 flex justify-center items-center gap-1 text-xs rounded-md font-semibold bg-[#F2F2F2]"
            >
              <IoCheckmark />
              <span className="">1 Points</span>
              {isDown === true ? <FaCaretUp /> : <FaCaretDown />}
            </button>
            <div
              className={
                "w-20 h-10 bg-gray-200 " + (isDown === true ? "" : "hidden")
              }
            ></div>
          </div>

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
        <header className="w-full h-12 bg-[#F9F9F9]"></header>

        {/*  */}
        <section className="w-full h-[calc(100%-48px)] overflow-y-auto bg-[#E5E5E5] px-8 py-4">
          <div className="w-full flex justify-center">
            <div className="w-[1064px] h-[600px] bg-[#461A42] rounded-2xl">
              <section className="p-4 w-full h-full">
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
                  <div className="h-full w-full gap-2 grid md:grid-flow-col md:auto-cols-fr">
                    {renderCards &&
                      renderCards.map((e, index) => {
                        return <OptionCard key={index} index={index} 
                          colorObj={e} 
                          renderCards={renderCards} 
                          handleDeleteOption={handleDeleteOption}
                          singleQuesData={singleQuesData}
                          setSingleQuesData={setSingleQuesData}  
                        />;
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
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function OptionCard({ index, colorObj, renderCards, handleDeleteOption, singleQuesData, setSingleQuesData }) {
  const [optionContent, setOptionContent] = useState("");
  const optionRef = useRef(null);
  const optionDivRef = useRef(null);
  const placeholder = "Type your question here";
  const [divDarkBg, setDivDarkBg] = useState(false);
  const [showPlace, setShowPlace] = useState(true);

  useEffect(() => {
    setShowPlace(true)
  },[renderCards])

  function handleDeleteButton(){
    setOptionContent(() => "" );
    setShowPlace(true)
    optionRef.current.textContent = "";
    handleDeleteOption(index);
  }
  // console.log(optionContent, " " , index + 1)

  useEffect(() => {
    if(optionContent != "") setShowPlace(false);
    else setShowPlace(true)
  },[optionContent])

  function handleOptionInput(e) {
    setOptionContent(e.currentTarget.textContent);
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
        <button onClick={() => handleDeleteButton()}
          className="w-6 h-6 flex justify-center items-center mx-1 mt-1 text-white bg-[#F2F2F2] rounded bg-opacity-25
           hover:bg-opacity-50 duration-300">
          <MdOutlineDelete className="text-white text-base" />
        </button>
        {/* mark as correct answer */}
        <button className="w-6 h-6 mx-1 mt-1 flex justify-center items-center ">
          <IoIosCheckmarkCircleOutline className="text-3xl text-white " />
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
        <div className="w-full h-fit text-center">
          <div
            ref={optionRef}
            className="p-2 rounded-md focus:outline-none text-xl font-quicksand text-white "
            contentEditable="true"
            onInput={handleOptionInput}
            suppressContentEditableWarning={true}
          >
            {showPlace === true && (
              <div className="p-2 pointer-events-none text-white">
                {placeholder}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
