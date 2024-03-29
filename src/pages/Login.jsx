import React, { useState } from "react";
import { handleSignIn } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // не нужно потому что так и так при ремаунте инициализируется с null
  // useEffect(() => {
  //   return setError(null);
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(error);

  return (
    <div className="login-page w-1/3 shadow-lg rounded-md p-4 mt-4 mx-auto bg-gray-500">
      <div className="form text-white">
        <div className="login-header">
          <h3 className="text-3xl font-bold w-max mx-auto">ВХОД</h3>
          <p className="text-xs mt-10 mb-2">
            Пожалуйста войдите в учетную запись
          </p>
        </div>
        <form className="flex flex-col gap-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="p-2 rounded-md text-black"
            name="username"
            placeholder="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="p-2 rounded-md text-black"
            name="password"
            placeholder="Пароль"
          />
          <button
            onClick={handleSubmit}
            className="bg-gray-900 p-2  mt-8 rounded-md"
            type="submit"
          >
            Login
          </button>
          {error ? <p className="text-red-500">{error}</p> : null}
          <p className="message mt-6">
            Не зарегестрированы?{" "}
            <Link to="/signUp" className="underline">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
