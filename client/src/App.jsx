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
import AdminBlogs from "./pages/Admin/AdminBlogs";
import AdminMessage from "./pages/Admin/AdminMessage";
import CreateBlog from "./pages/Blog/CreateBlog";
import MessageDetails from "./pages/Admin/MessageDetails";
import Users from "./pages/Admin/Users";
import Donate from "./pages/Donate";
import Payments from "./pages/Admin/Payments";
import PaymentDetails from "./pages/Admin/PaymentDetails";


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
            <Route path="/donate" element={<Donate />} /> 

            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin" element={<Users />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
            <Route path="/admin/messages" element={<AdminMessage />} />
            <Route path="/admin/message/:id" element={<MessageDetails />} />
            <Route path="/admin/create-blog" element={<CreateBlog />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/payments/:id" element={<PaymentDetails />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App; 