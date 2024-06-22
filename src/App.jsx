import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import CreateQuiz from "./Pages/CreateQuiz";
import UserDashboard from "./Pages/UserDashboard";
import UserQuiz from "./Pages/UserQuiz";

function ProtectedRoute({ children }) {
  let login = false;

  if (login) return children;
  else return <Navigate to={"/login"} />;
}


function App() {
  return (
    <>
      {/* <div className='w-screen h-screen bg-transparent absolute flex justify-center items-center over '>
        <div className="bg-red-400 w-96 h-96"></div>
      </div> */}
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Dashboard />
            // </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin/quiz" element={<CreateQuiz />}></Route>
        <Route path="/user/dashboard" element={<UserDashboard />}></Route>
        <Route path='/user/quiz/:id' element={<UserQuiz />}></Route>
      </Routes>
    </>
  );
}

export default App;
