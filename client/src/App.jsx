import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/edit/:id" element={<UserForm />} />
        <Route path="/create" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
