import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setHeightChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});
  const adminPass = "123456";
  const adminUsername = "admin";

  function handleUsername(e) {
    setFormData((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  }

  function handlePassword(e) {
    setFormData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  }

  function handleLoginForm(e) {
    e.preventDefault();
    const newErrors = {};

    if (formData.username !== adminUsername) {
      setHeightChange((prev) => !prev);
      newErrors.username = "Admin Username is incorrect, try username = admin";
    } else if (formData.password !== adminPass) {
      setHeightChange((prev) => !prev);
      newErrors.password = "Admin Password is incorrect, try password = 123456";
    }

    if (Object.keys(newErrors).length === 0) {
      console.log("navigate to Admin Page");
      localStorage.setItem("Login", JSON.stringify(formData.username));
      navigate("/");
    }

    setError(newErrors);
  }

  return (
    <form
      onSubmit={handleLoginForm}
      className="w-full px-16 text-center h-full flex flex-col gap-5 py-8 justify-center"
    >
      <div>
        <label
          className="text-left block pb-2 text-xl font-semibold "
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          placeholder="Enter username"
          id="username"
          className="px-3 py-2 placeholder:text-lg rounded-md text-lg outline-none w-full bg-gray-100 "
          value={formData.username}
          onChange={handleUsername}
          required
        />
        {error.username && (
          <span className="block text-start text-red-600 font-medium tracking-wide">
            {error.username}
          </span>
        )}
      </div>

      <div>
        <label
          className="text-left block pb-2 text-xl font-semibold"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          id="password"
          className="px-3 py-2 placeholder:text-lg rounded-md text-lg outline-none w-full bg-gray-100 "
          value={formData.password}
          onChange={handlePassword}
          required
        />
        {error.password && (
          <span className="block text-start text-red-600 font-medium tracking-wide">
            {error.password}
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

export default LoginForm;
