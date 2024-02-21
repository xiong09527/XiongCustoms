import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react"
import NavBar from "./components/Navigation/NavBar";
import HomePage from "./pages/HomePage";



function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <NavBar />
        <div className ="">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App
