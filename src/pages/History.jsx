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
  return (
    <div className="w-full">
      <h1 className="text-white font-bold text-xl p-4">Ваша История Поиска:</h1>
      <div className="grid grid-cols-3 items-center justify-center gap-2 flex-col">
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
  return (
    <div className="gap-2 w-1/4">
      <Link to={`/search/${search}`}>
        <button className="p-4 rounded-md history-comp bg-gray-800 w-1/2 text-white m-2">
          {search}
        </button>
      </Link>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveHistory();
        }}
        className="w-2 text-white relative left-4 bottom-8"
      >
        X
      </button>
    </div>
  );
};

export default History;
