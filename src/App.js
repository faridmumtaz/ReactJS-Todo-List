import logo from "./logo.svg";
import React, { useState } from 'react';
import "./App.css";
import LoginPage from "./container/LoginPage";
import TodoPage from "./container/TodoPage";

function App() {

  const [page, setPage] = useState("false");
  const loggedIn = localStorage.getItem("loggedIn");
  return (
    <div className="App">
        {page === "true" || loggedIn === "true" ? <TodoPage/> : <LoginPage setPage={setPage}/> }
    </div>
  );
}

export default App;
