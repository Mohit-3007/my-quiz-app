import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import CreateQuiz from "./Pages/CreateQuiz";
import UserDashboard from "./Pages/UserDashboard";
import UserQuiz from "./Pages/UserQuiz";

function ProtectedRoute({ children }) {
  let login = JSON.parse(localStorage.getItem("Login"));
  console.log("login status ", login);

  if (!login) {
    console.log("null or not logged in");
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin/quiz" element={<CreateQuiz />}></Route>
        <Route path="/user/dashboard" element={<UserDashboard />}></Route>
        <Route path="/user/quiz/:id" element={<UserQuiz />}></Route>
      </Routes>
    </>
  );
}

export default App;
