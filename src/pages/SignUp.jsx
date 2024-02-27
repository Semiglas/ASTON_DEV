import React from "react";

function SignUp() {
  return (
    <div className="signup-page w-1/3 shadow-lg rounded-md p-4 mt-4 mx-auto bg-gray-500">
      <div className="form text-white">
        <div className="signup-header">
          <h3 className="text-3xl font-bold w-max mx-auto">РЕГИСТРАЦИЯ</h3>
          <p className="text-xs mt-10 mb-2">
            Пожалуйста, заполните форму для регистрации
          </p>
        </div>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            className="p-2 rounded-md"
            name="username"
            placeholder="Имя пользователя"
          />
          <input
            type="email"
            className="p-2 rounded-md"
            name="email"
            placeholder="Электронная почта"
          />
          <input
            type="password"
            className="p-2 rounded-md"
            name="password"
            placeholder="Пароль"
          />
          <button className="bg-gray-900 p-2 mt-8 rounded-md" type="submit">
            Зарегистрироваться
          </button>
          <p className="message mt-6">
            Уже зарегистрированы?{" "}
            <a href="#" className="underline">
              Вход
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
