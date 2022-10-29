import "./App.css";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useRadio,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { useContext, useState } from "react";
import Main from "./Components/Main/Main";
import AddUmkm from "./Components/AddUmkm";
import About from "./Components/Main/About";
import Checkout from "./Components/Main/Checkout";
import Navbar from "./Components/Main/Navbar";
import Card from "./Components/Main/Card";
import Daftar from "./Components/Register/Daftar";

function App() {
  return (
    <Router basename="/bangkit-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />

        <Route path="main" element={<Main />}>
          <Route path="card" element={<Card />} />
          <Route path=":id" element={<About />} />
        </Route>
        <Route path="registerUMKM" element={<AddUmkm />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="daftar" element={<Daftar />} />
      </Routes>
    </Router>
  );
}

export default App;
