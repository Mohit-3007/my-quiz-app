import React, { useRef, useState, useEffect } from "react";
import AdminLogin from "../Components/AdminLogin";
import UserLogin from "../Components/UserLogin";

const Login = () => {
  const [tab, setTab] = useState("admin");
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef(null);
  const [heightChange, setHeightChange] = useState(true);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [tab, heightChange]);

  // console.log("contentHeight ,", contentHeight)

  return (
    <div className="bg-quiz-100 w-screen h-screen flex justify-center items-center">
      <div
        className="w-96 h-fit bg-[#E5E5E5] rounded-md overflow-hidden shadow-lg
       shadow-quiz-700 box-content"
      >
        <div
          className="relative mx-auto w-full flex border-b-2 border-quiz-600 border-solid 
          shadow-xl  divide-x-2 divide-quiz-400"
        >
          <button
            className={
              "w-1/2 flex justify-center items-end text-3xl pt-4 pb-[1px] " +
              "hover:bg-quiz-400 hover:text-white hover:tracking-wider hover:scale-110 " +
              "duration-500 hover:shadow-2xl hover:shadow-quiz-400 hover:-ml-[-8px] " +
              (tab === "admin" ? "bg-quiz-400 text-white" : "")
            }
            onClick={() => setTab("admin")}
          >
            Admin
          </button>
          <button
            className={
              "w-1/2 flex justify-center items-end text-3xl pt-4 pb-[1px] " +
              "hover:bg-quiz-400 hover:text-white hover:tracking-wider hover:scale-110 " +
              "duration-500 hover:shadow-2xl hover:shadow-quiz-400 hover:-ml-[-8px] " +
              (tab === "user" ? "bg-quiz-400 text-white" : "")
            }
            onClick={() => setTab("user")}
          >
            User
          </button>
        </div>

        <div
          className={`transition-all duration-700 ease-in-out h-fit max-h-fit `}
          style={{ maxHeight: contentHeight, minHeight: contentHeight }}
        >
          <div ref={contentRef}>
            {tab === "admin" ? (
              <AdminLogin setHeightChange={setHeightChange} />
            ) : (
              <UserLogin setHeightChange={setHeightChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
