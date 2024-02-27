import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Preloader } from "../components/Preloader";
import PrivateRoute from "../components/PrivateRoute";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";

const importPage = (pageName) => lazy(() => import(`../pages/${pageName}`));

const Home = importPage("Home");
const Login = importPage("Login");
const Signup = importPage("Signup");
const Movie = importPage("Movie");
const Search = importPage("Search");
const Favorites = importPage("Favorites");
const History = importPage("History");
const NotFoundPage = importPage("NotFoundPage");


export function AppRoutes() {
  return (
    <ErrorBoundary
      fallback={
        <div className="w-max mx-auto uppercase text-xl font-bold text-white">
          Sorry, an app encountered an error
        </div>
      }
    >
      <Suspense fallback={<Preloader />}>
        {/* isAuth */}
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/search/movie/:id" element={<Movie />} />

          <Route element={<PrivateRoute />}>
            <Route path="/history" element={<History />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>

          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
