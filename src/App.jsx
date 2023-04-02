import React, { createContext, useState } from 'react';
import "./App.css";
import LoginPage from "./container/LoginPage";
import TodoPage from "./container/TodoPage";
import SignUpPage from './container/SignUpPage';
export const UserContext = createContext()

function App() {

  // const [page, setPage] = useState("false");
  // const loggedIn = localStorage.getItem("loggedIn");
  const [loginPage, setLoginPage] = useState(true)
  const [user, setUser] = useState("farid")

  return (
    <div className="App">
        {/* {page === "true" || loggedIn === "true" ? <TodoPage/> : <LoginPage setPage={setPage}/> } */}
        <UserContext.Provider value={{loginPage,setLoginPage,setUser}}>
          {loginPage ? <LoginPage /> : <SignUpPage />}
        </UserContext.Provider>
    </div>
  );
}

export default App;
