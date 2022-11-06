import "./App.css";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useRadio,
} from "@chakra-ui/react";
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Main from "./Components/Main/Main";
import AddUmkm from "./Components/AddUmkm";
import About from "./Components/Main/About";
import Checkout from "./Components/Main/Checkout";
import Card from "./Components/Main/Card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Daftar from "./Components/Register/Daftar";
import Portofolio from "./Components/Main/Portofolio";
import UmkmDash from "./Components/Main/UmkmDash";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="main" element={<Main />}>
            <Route path="card" element={<Card />} />
            <Route path=":id" element={<About />} />
            <Route path="portofolio" element={<Portofolio />} />
            <Route path="umkm-dashboard" element={<UmkmDash />}></Route>
          </Route>
          <Route path="registerUMKM" element={<AddUmkm />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="daftar" element={<Daftar />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
