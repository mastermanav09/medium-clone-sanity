import React from "react";
import MainNavigation from "./MainNavigation";

const Header = (props) => {
  return (
    <>
      <MainNavigation />
      <main className="mx-auto">{props.children}</main>
    </>
  );
};

export default Header;
