import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext, handleSignOut } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Header() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function signOutAndNavigate() {
    handleSignOut(dispatch);
    navigate("/");
  }

  return (
    <header className="flex justify-between bg-gray-900  items-center px-6">
      <Link to={"/"} className="logo">
        <div className="svg-name text-white">
          <svg
            className="w-24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            viewBox="0 0 2048.0 2048.0"
          >
            {" "}
            <g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)">
              {" "}
              <path
                d="M-389.944,-342.688 C-497.872,-192.383 -494.624,45.4793 -384.36,177.788 C-231.215,359.275 46.8443,361.781 228.931,194.307 C248.556,176.143 274.401,142.941 305.021,177.788 C335.641,212.634 217.251,297.223 146.702,327.832 C76.1527,358.441 17.1744,366.088 -38.9499,369.957 C-95.0741,373.827 -148.192,354.455 -177.367,344.175 C-184.113,342.153 -189.737,350.7 -184.622,355.815 C56.2513,491.815 184.739,442.71 381.618,313.928 C421.684,287.72 421.447,221.492 382.724,182.768 L305.021,105.066 L269.22,69.2643 L-128.248,-328.203 L-214.463,-414.419 C-245.15,-445.106 -296.703,-444.697 -330.5,-412.361 C-352.601,-388.799 -372.34,-367.599 -389.944,-342.688 Z M-285.321,-301.617 L-342.611,-301.617 L-285.321,-349.686 L-285.321,-301.617 Z M-3.34253e-06,83.967 L-57.2901,83.967 L5.68434e-14,35.8976 L-3.34253e-06,83.967 Z M-285.321,59.9323 L-342.611,59.9323 L-285.321,11.8629 L-285.321,59.9323 Z M-113.195,253.22 L-170.486,253.22 L-113.195,205.151 L-113.195,253.22 Z M336.811,301.29 L279.521,301.29 L336.811,253.22 L336.811,301.29 Z "
                fill="#eeeeee"
                fillOpacity="1.00"
              />{" "}
            </g>{" "}
          </svg>{" "}
        </div>
      </Link>
      {!user && (
        <div className="login-register flex gap-4">
          <Link to="/login">
            <button className="login-button border rounded-md p-2 text-white">
              Войти
            </button>
          </Link>
          <Link to="/signup">
            <button className="register-button border rounded-md p-2 text-white">
              Зарегистрироваться
            </button>
          </Link>
        </div>
      )}
      {user && (
        <div className="login-register flex gap-4">
          <Link to="/history">
            <button className="login-button border rounded-md p-2 text-white">
              История
            </button>
          </Link>
          <Link to={`/${user.uid}/favorites`}>
            <button className="register-button border rounded-md p-2 text-white">
              Избранное
            </button>
          </Link>

          <button
            className="register-button border rounded-md p-2 text-white"
            onClick={signOutAndNavigate}
          >
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
