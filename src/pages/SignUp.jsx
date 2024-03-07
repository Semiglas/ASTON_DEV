import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="signup-page text-black w-1/3 shadow-lg rounded-md p-4 mt-4 mx-auto bg-gray-500">
      <div className="form text-white">
        <div className="signup-header">
          <h3 className="text-3xl font-bold w-max mx-auto">РЕГИСТРАЦИЯ</h3>
          <p className="text-xs mt-10 mb-2">
            Пожалуйста, заполните форму для регистрации
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            className="p-2 rounded-md text-black"
            name="username"
            placeholder="Имя пользователя"
          />
          <input
            type="email"
            className="p-2 rounded-md text-black"
            name="email"
            placeholder="Электронная почта"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-2 rounded-md text-black"
            name="password"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-gray-900 p-2 mt-8 rounded-md" type="submit">
            Зарегистрироваться
          </button>
          <p className="message mt-6">
            Уже зарегистрированы?{" "}
            <Link to="/login">
            <a href="#" className="underline">
              Вход
            </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
