import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";



const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
