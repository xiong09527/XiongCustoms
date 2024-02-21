import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react"
import NavBar from "./components/Navigation/NavBar";
import HomePage from "./pages/HomePage";
import About from "./pages/About";





function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <NavBar />
        <div className ="">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App
