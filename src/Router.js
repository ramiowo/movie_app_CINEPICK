import { HashRouter, Route, Routes } from "react-router-dom";
import Detail from "./pages/detail/Detail";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/login/Login";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default Router;
