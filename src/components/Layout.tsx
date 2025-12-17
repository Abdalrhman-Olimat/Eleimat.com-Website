import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { FakeTerminal } from "./FakeTerminal";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <FakeTerminal />
    </>
  );
};
