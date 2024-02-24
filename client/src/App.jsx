import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import NavBar from "./components/Navigation/NavBar";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/Blog/BlogDetails";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ThanksModal from "./pages/Contact/ThanksModal";
import Footer from "./components/Navigation/Footer/Footer";




  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clients: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          projects: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    uri: "http://localhost:4000",
    //uri: "http://localhost:3000",
    //uri: "https://longbackend.onrender.com",

    cache,
  });

  function App() {
    
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <div className="">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/thanks" element={<ThanksModal />} />    
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App; 