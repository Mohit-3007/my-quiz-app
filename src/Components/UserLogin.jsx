import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = ({ setHeightChange }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleLoginUser(e) {
    e.preventDefault();
    // console.log("Enter user",email, " ", email.length);
    const usersData = JSON.parse(localStorage.getItem("UsersData")) || [];
    console.log("usersData ", usersData);
    if (usersData.length === 0) {
      const userObj = {
        id: email,
        email: email,
        isLogin: true,
        attemptedQuiz: [],
        pendingQuiz: [],
      };
      usersData.push(userObj);
      localStorage.setItem("UsersData", JSON.stringify(usersData));
      localStorage.setItem("Login", JSON.stringify(email));
      return navigate("/user/dashboard");
    }
    const isOLdUser = usersData.find((e) => {
      return e.id === email;
    });
    if (isOLdUser) {
      isOLdUser.isLogin = true;
      const index = usersData.findIndex((e) => {
        return e.id === email;
      });
      usersData.splice(index, 1, isOLdUser);
      localStorage.setItem("UsersData", JSON.stringify(usersData));
      localStorage.setItem("Login", JSON.stringify(email));
      return navigate("/user/dashboard");
    } else if (!isOLdUser) {
      const userObj = {
        id: email,
        email: email,
        isLogin: true,
        attemptedQuiz: [],
        pendingQuiz: [],
      };
      usersData.push(userObj);
      localStorage.setItem("UsersData", JSON.stringify(usersData));
      localStorage.setItem("Login", JSON.stringify(email));
      navigate("/user/dashboard");
    }
  }

  return (
    <form
      onSubmit={handleLoginUser}
      className="w-full px-16 text-center h-full flex flex-col gap-5 py-8 justify-center"
    >
      <div className="py-1 text-2xl font-bold tracking-wider">
        Ready for Quiz !!
      </div>

      <div>
        <label
          className="text-left block pb-2 text-xl font-semibold "
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          className="px-3 py-2 placeholder:text-lg rounded-md text-lg outline-none w-full bg-gray-100 "
          value={email}
          onChange={handleEmail}
          required
        />
        {error && (
          <span className="block text-start text-red-600 font-medium tracking-wide">
            {error}
          </span>
        )}
      </div>

      <input
        type="submit"
        value={"Submit"}
        className="px-3 py-2 placeholder:text-lg rounded-md outline-none block bg-quiz-400
            text-white text-2xl font-bold tracking-wider hover:scale-105 duration-300 
            hover:shadow-2xl hover:shadow-quiz-400 hover:tracking-widest transition-all"
      />
    </form>
  );
};

export default UserLogin;
