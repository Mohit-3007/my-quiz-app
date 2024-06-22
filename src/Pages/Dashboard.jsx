import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaChevronRight } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-100  w-screen h-screen  ">
      {/* navbar */}
      <nav className="w-full flex justify-between items-center py-3 px-5 500-s:py-5 500-s:px-7">
        <img src={logo} className="max-400-s:w-[120px] max-400-s:h-[40px] max-500-s:w-[150px] max-500-s:h-[50px] w-[225px] h-[72px] transition-all ease-linear duration-500" alt="logo" />
        <button onClick={() => navigate("/login")}
          className="py-1.5 px-3 400-s:py-2 400-s:px-4 500-s:py-3 500-s:px-6 mr-5 rounded-xl hover:scale-110 duration-300 hover:tracking-wide font-poppins 
          text-base 400-s:text-xl 500-s:text-2xl font-bold bg-quiz-400 text-white hover:bg-quiz-300 hover:text-quiz-900"
        >
          Logout
        </button>
      </nav>
      {/* main */}
      <section className="w-full h-3/4 bg-quiz-500 flex flex-col items-center py-10">
        <div className="h-full w-[850px] flex flex-col items-center gap-2 px-7 830-s:gap-4 830-s:px-10 box-content mt-[30px] mb-[10px]">
          <h1 className="text-white font-semibold font-poppins duration-300 transition-all text-[8vw] 830-s:text-7xl">
            Free Online
            <span className="text-[#EFA929]"> quiz maker</span>
          </h1>
          <p className="text-white font-quicksand font-medium text-center text-base transition-all ease-linear duration-300
           mt-4 tracking-wide 830-s:tracking-wider 830-s:text-2xl max-830-s:w-[80vw]">Make a quiz with different question types to engage students in a
            classroom, train employees at work, or play trivia with friends.</p>

          <button className="mt-[30px] min-h-[106px]">
            <a href="/admin/quiz" className="relative top-0 flex items-center gap-2 mt-[10px] text-[4vw] px-3 py-1 bg-[#F2F2F2] text-quiz-600 
            500-s:px-4 500-s:py-2 830-s:text-3xl 830-s:py-4 830-s:px-8 border-b-4 hover:top-1 830-s:mt-[30px] transition-all ease-linear
            font-quicksand font-medium rounded-xl 830-s:border-b-8 border-[#D6D6D6] shadow-sm shadow-[#F2F2F2]
            hover:border-b-0 hover:duration-300 duration-500 830-s:hover:top-2  ">
              Create Quiz<FaChevronRight className="fill-quiz-600 text-[2.5vw] 830-s:text-2xl" /></a>
          </button>

          <div className="max-830-s:w-[80vw] mt-3 float-start flex items-start 500-s:items-center justify-center text-white font-quicksand font-bold
            830-s:text-xl tracking-wide 830-s:tracking-wider">
           <TiTick className="text-2xl 500-s:text-3xl text-quiz-300 mr-1 relative bottom-[2px]" /> <span>Used by 50 million+ people around the world</span>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Dashboard;
