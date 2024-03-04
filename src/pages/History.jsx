import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "../hooks/useHistory";
import { Preloader } from "../components/Preloader";
import { Link } from "react-router-dom";

function History() {
  const { history, removeHistory, isLoading } = useHistory();

  if (isLoading) {
    return <Preloader></Preloader>;
  }

  function handleRemoveHistory(search) {
    // Modified to accept search as a parameter
    removeHistory({
      id: search,
    });
  }

  if (history?.length === 0) {
    return (
      <div className="text-white m-12 text-center font-bold text-xl uppercase">
        У вас пока нет истории
      </div>
    );
  }
  console.log(history);
  return (
    <div className="w-full">
      <h1 className="text-white font-bold text-xl p-4">Ваша История Поиска:</h1>
      <div className="flex justify-center gap-2 flex-col">
        {history?.map((search) => (
          <HistoryComponent
            key={search}
            search={search}
            handleRemoveHistory={() => handleRemoveHistory(search)}
          />
        ))}
      </div>
    </div>
  );
}

const HistoryComponent = ({ search, handleRemoveHistory }) => {
  console.log(search + " in history component");
  return (
    <div className="gap-2 w-1/4">
      <Link to={`/search/${search}`}>
        <button className="p-4 rounded-md  bg-gray-800 w-1/2 text-white m-2">
          {search}
        </button>
      </Link>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Stop event propagation
          handleRemoveHistory();
        }}
        className="w-2 text-white relative right-8"
      >
        X
      </button>
    </div>
  );
};

export default History;
