import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { IoChevronBackSharp, IoCheckmark } from "react-icons/io5";
import { MdOutlineModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { RxCross2, RxCheck } from "react-icons/rx";
import { useQuizContext } from "../ContextAPI/QuizContextApi";
import { FaRegCircle } from "react-icons/fa";


const PreviewQuiz = ({ handlePreviewModal }) => {
    const { quizObj, setQuizObj } = useQuizContext();
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        const totalPoint = quizObj.reduce((accumulator, currentValue, index) => {
            if (index === 0) {
                return accumulator; 
            }
            return accumulator + (currentValue.points || 0);  
        }, 0);
        setTotalPoints(totalPoint);    
    },[quizObj])

    




  return (
    <div className="absolute top-0 w-screen h-screen bg-[#424040] bg-opacity-60 z-20">
      <div className="w-2/4 min-h-fit max-h-[80vh] mt-12 rounded-md bg-[#F2F2F2] mx-auto shadow-md shadow-[#a8a4a4]">
        
        {/* header */}
        <div className="w-full h-14 bg-white rounded-t-md flex item justify-between border-b shadow-sm border-[#E5E5E5]
         items-center px-4 py-3  ">
            <span className="font-bold text-xl">
                <span>{quizObj.length - 1} Questions </span>
                <span>({totalPoints} points)</span>
            </span>
            <div className="flex items-center gap-1.5">
                <button className="px-4 py-1 border flex items-center border-quiz-400 bg-quiz-100 rounded-md text-quiz-400
                hover:bg-quiz-400 hover:text-quiz-100 hover:border-quiz-100 duration-300">
                    <FiPlus className="mr-2" />
                    <span className="font-semibold text-sm">Add Questions</span>
                </button>
                <button onClick={handlePreviewModal} className="px-1 py-1 text-xl hover:bg-[#E5E5E5] rounded-full scale-x-110 duration-300 "><RxCross2 /></button>
            </div>
        </div>

        {/* questions preview */}
        <div className="w-full h-[calc(100%-56px-24px]] max-h-[calc(80vh-56px-24px)] overflow-y-auto scrollbar-hide">
            <div className="w-full h-full ">
                {quizObj && quizObj.map((e,i) => {
                    if(i != 0){
                        return <QuizPreviewContainer data={e} index={i} quizObj={quizObj} setQuizObj={setQuizObj} />       
                    }  
                })
                }
            </div>
        </div>

        <div className="w-full h-6 bg-quiz-400 rounded-b-md"></div>
      </div>
    </div>
  );
};

function QuizPreviewContainer({data, index, quizObj, setQuizObj}){
    const [isDown, setIsDown] = useState(false);
    const [quizPoint, setQuizPoint] = useState(data?.points);
    const [editQuiz, setEditQuiz] = useState(false);
    const [inputReadOnly, setInputReadOnly] = useState(true);
    const [ques, setQues] = useState(data?.ques);
    const [quizOption, setQuizOption] = useState(data?.options)
    const [changeCorrectOptionIdx, setChangeCorrectOptionIdx]= useState(null);

    useEffect(() => {
        setQuizPoint(data.points);
        setQues(data.ques);
        setQuizOption(data.options);
    },[data])

    useEffect(() =>{
        if(editQuiz){
            setInputReadOnly(false);
        }else{
            setInputReadOnly(true);
        }
    },[editQuiz])

    function handleChangeCorrectOption(idx){
        setChangeCorrectOptionIdx(idx);
    }

    function handleOptionValueChange(e, idx){
        const newValue = e.target.value;
        setQuizOption(prev => {
            const newOptions = [...prev]; 
            newOptions[idx] = newValue;   
            return newOptions;            
        });
    }   

    function handleSaveChanges(){
        const updateQuizQues={
            ques: ques,
            options: quizOption,
            answer: "",
            points: quizPoint,
        }
        if(changeCorrectOptionIdx !== null){
            updateQuizQues.answerIdx = changeCorrectOptionIdx
        }else{
            updateQuizQues.answerIdx = data?.answerIdx;
        }
        console.log("updateQuizQues ",updateQuizQues);
        setQuizObj( (prev) => {
            const arr = [...prev];
            arr.splice(index, 1, updateQuizQues);
            return arr;
        } )

        setEditQuiz(false);
    }

    function handleDeleteQuestion(){
        setQuizObj((prev) => {
            const arr = [...prev];
            arr.splice(index, 1);
            return arr;
        })
        console.log("successfully delete question")
    }

    function handleDropDown(){
        if(!editQuiz) return
        setIsDown(!isDown);
    }
    function handlePoints(point){
        setQuizPoint(point);
        setIsDown(false)
    }

    function handleEditQuiz(){
        setEditQuiz(true)
    }

    return (
        <div key={index} className={"w-full h-fit p-4 bg-white border shadow-sm border-[#E5E5E5] " + (quizObj.length == 2 ? 'mb-0' : "mb-6") }>
            {/* edit, delete, points button */}
            <div className="w-full h-6 mb-4 flex items-center justify-end gap-3">
                
                {/* save changes button */}
                <button onClick={handleSaveChanges} 
                    className={"items-center border-quiz-400 bg-quiz-100 rounded-md text-quiz-400 " +
                    "hover:bg-quiz-400 hover:text-quiz-100 hover:border-quiz-100 duration-300 ease-linear " 
                    + (editQuiz ? 'px-4 py-1 w-fit h-fit border flex' : 'w-0 p-0 h-0 border-none') }>
                    <span className={"font-semibold text-sm duration-300 ease-linear " + (editQuiz ? "flex" : "hidden")}>Save Changes</span>
                </button>
                

                {/* question points */}
                <div className="w-fit h-6">
                    <button
                        onClick={handleDropDown}
                        className="w-full h-full px-2 flex justify-center items-center gap-1 text-xs rounded-sm font-semibold 
                        border border-[#E5E5E5] hover:bg-[#F2F2F2] duration-300 text-[#424242]"
                    >   
                        <span className="">{quizPoint} Points</span>
                        {editQuiz && (isDown === true ? <FaCaretUp /> : <FaCaretDown />)}
                    </button>

                    <div
                        className={
                        "w-full rounded-sm  mt-2 h-10 bg-white  " +
                        (isDown === true ? "" : "hidden")
                        }
                    >
                        <ul className="w-full h-[15vh] rounded-sm overflow-y-auto scrollbar-hide bg-inherit
                            relative z-10 list-none border border-[#E5E5E5] ">
                        {Array.from({ length: 20 }, (_, i) => {
                            return (
                            <li
                                key={i}
                                onClick={() => handlePoints(i + 1)}
                                className="w-full h-8"
                            >
                                <button
                                className="w-full h-full px-2 py-1 flex justify-between items-center
                                font-semibold text-[#424242] text-xs hover:bg-[#F2F2F2]"
                                >
                                {i + 1} {i == 0 ? "Point" : "Points"}
                                </button>
                            </li>
                            );
                        })}
                        </ul>
                    </div>
                </div>

                {/* edit question */}
                <button onClick={handleEditQuiz} className="w-6 h-[22px] border border-[#E5E5E5] text-[#424242] hover:bg-[#E5E5E5] rounded-sm flex
                    items-center justify-center duration-300">
                    <MdOutlineModeEdit />
                </button>

                {/* delete question */}
                <button onClick={handleDeleteQuestion} className="w-6 h-[22px] border border-[#E5E5E5] text-[#424242] hover:bg-[#E5E5E5] rounded-sm flex
                items-center justify-center duration-300">
                    <MdOutlineDeleteOutline />
                </button>

            </div>

            {/* main */}
            <div className="w-full flex flex-col gap-4">
                {/* question */}
                <div className="text-black text-base">
                    <span className="">Q {index}. </span>
                    <input type="text" className="outline-none border-none p-0 focus:outline-none focus:border-none" 
                        value={ques}
                        onChange={(e) => setQues(e.target.value)}
                        readOnly={inputReadOnly}
                        style={{ outline: 'none' }}
                    />
                </div>
                <div className="grid gap-1">
                    <div className="text-sm leading-4 font-semibold">Answer Choices</div>
                    {/* options */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-1">
                        {quizOption.map((each, idx) => {
                            return (
                                <Options key={idx} idx={idx} each={each} 
                                    editQuiz={editQuiz} 
                                    inputReadOnly={inputReadOnly}
                                    data={data}
                                    quizOption={quizOption}
                                    handleOptionValueChange={handleOptionValueChange}
                                    handleChangeCorrectOption={handleChangeCorrectOption}
                                    changeCorrectOptionIdx={changeCorrectOptionIdx}
                                />
                            )
                        })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
} 


function Options({ idx, each, editQuiz, inputReadOnly, data, quizOption, handleOptionValueChange, handleChangeCorrectOption, changeCorrectOptionIdx,  }){

    return (
        <div key={idx} className="flex gap-0.5 items-center">
            <div>
                {!editQuiz && (data.answerIdx === idx ?
                    <RxCheck className="w-5 h-5 text-xs text-green-600" /> : 
                        <RxCross2 className="w-4 h-4 text-xs text-red-600" />)
                }
                {editQuiz && <FaRegCircle className={"mr-1 cursor-pointer "+(changeCorrectOptionIdx === idx ? 'bg-green-500 rounded-full text-transparent':'')}
                 onClick={() => handleChangeCorrectOption(idx)} />}
            </div>
            {/* <div className="text-sm leading-5">{each}</div> */}
            <input type="text" className="outline-none border-none p-0 focus:outline-none focus:border-none" 
                value={quizOption[idx]}
                onChange={(e) => handleOptionValueChange(e, idx)}
                readOnly={inputReadOnly}
                style={{ outline: 'none' }}
            />
        </div>
    )
}

export default PreviewQuiz;
