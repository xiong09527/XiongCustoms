import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react"
import NavBar from "./components/Navigation/NavBar";



function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <NavBar />
      </Router>
  );
}

export default App
