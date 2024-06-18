import React, { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../Components/Modal";
import logo from "../assets/logo.png";
import { FaChevronRight } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";


const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-100  w-screen h-screen  ">
      {/* navbar */}
      <nav className="w-full flex justify-between items-center py-5 px-7">
        <img src={logo} alt="logo" />
        <button
          className="py-3 px-6 mr-5 rounded-xl hover:scale-110 duration-300 hover:tracking-wide font-poppins text-2xl
         font-bold bg-quiz-400 text-white hover:bg-quiz-300 hover:text-quiz-900"
        >
          Logout
        </button>
      </nav>
      {/*  */}
      <section className="w-full h-3/4 bg-quiz-500 flex flex-col items-center py-10">
        <div className="h-full w-[850px] flex flex-col items-center gap-4 px-10 box-content mt-[30px] mb-[10px]">
          <h1 className="text-white font-semibold font-poppins text-7xl">
            Free Online
            <span className="text-[#EFA929]"> quiz maker</span>
          </h1>
          <p className="text-white font-quicksand font-medium text-center mt-4 tracking-wider text-2xl">Make a quiz with different question types to engage students in a
            classroom, train employees at work, or play trivia with friends.</p>

          <button className="mt-[30px] min-h-[106px]">
            <a href="/admin/quiz" className="relative top-0 flex items-center gap-2 mt-[30px] py-4 px-8 bg-[#F2F2F2] text-quiz-600 text-3xl
            font-quicksand font-medium rounded-xl border-b-8 border-[#D6D6D6] shadow-sm shadow-[#F2F2F2]
            hover:border-b-0 hover:duration-300 duration-300 hover:top-2  ">
              Create Quiz<FaChevronRight className="fill-quiz-600 text-2xl" /></a>
          </button>

          <div className="mt-3 py-3 px-4 float-start flex items-center justify-center text-white font-quicksand font-bold
          text-xl tracking-wider">
           <TiTick className="text-3xl text-quiz-300 mr-1 relative bottom-[2px]" /> <span>Used by 50 million+ people around the world</span>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Dashboard;
