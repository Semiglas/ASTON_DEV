import React from "react";

function Login() {
  return (
    <div className="login-page w-1/3 shadow-lg rounded-md p-4 mt-4 mx-auto bg-gray-500">
      <div className="form text-white">
        <div className="login-header">
          <h3 className="text-3xl font-bold w-max mx-auto">ВХОД</h3>
          <p className="text-xs mt-10 mb-2">Пожалуйста войдите в учетную запись</p>
        </div>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            className="p-2 rounded-md"
            name="username"
            placeholder="Никнейм"
          />
          <input
            type="password"
            className="p-2 rounded-md"
            name="password"
            placeholder="Пароль"
          />
          <button className="bg-gray-900 p-2  mt-8 rounded-md" type="submit">
            Login
          </button>
          <p class="message mt-6">
            Не зарегестрированы? <a href="#" className="underline">Регистрация</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
