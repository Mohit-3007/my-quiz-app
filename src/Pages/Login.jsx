import React, { useRef, useState, useEffect } from "react";
import AdminLogin from "../Components/AdminLogin";
import UserLogin from "../Components/UserLogin";

const Login = () => {
  const [tab, setTab] = useState("admin");
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [tab]);

  // console.log("contentHeight ,", contentHeight)

  return (
    <div className="bg-slate-500 w-screen h-screen flex justify-center items-center">
      <div
        className="w-96 h-fit bg-zinc-300 rounded-md overflow-hidden shadow-lg
       shadow-zinc-900 box-content"
      >
        <div className="relative mx-auto w-full flex border-b-2 border-black border-solid shadow-xl  divide-x-2 divide-slate-600">
          <button
            className={
              "w-1/2 flex justify-center items-end text-3xl pt-4 pb-[1px] " +
              "hover:bg-slate-600 hover:text-slate-300 hover:tracking-wider hover:scale-110 " +
              "duration-500 hover:shadow-2xl hover:shadow-slate-600 hover:-ml-[-10px] " +
              (tab === "admin" ? "bg-slate-600 text-slate-300" : "")
            }
            onClick={() => setTab("admin")}
          >
            Admin
          </button>
          <button
            className={
              "w-1/2 flex justify-center items-end text-3xl pt-4 pb-[1px] " +
              "hover:bg-slate-600 hover:text-slate-300 hover:tracking-wider hover:scale-110 " +
              "duration-500 hover:shadow-2xl hover:shadow-slate-600 hover:-ml-[-10px] " +
              (tab === "user" ? "bg-slate-600 text-slate-300" : "")
            }
            onClick={() => setTab("user")}
          >
            User
          </button>
        </div>

        <div className={`transition-all duration-700 ease-in-out  `}
          style={{ maxHeight: contentHeight, minHeight: contentHeight }}
          >
            <div ref={contentRef}>
              {tab === "admin" ? <AdminLogin /> : <UserLogin />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
