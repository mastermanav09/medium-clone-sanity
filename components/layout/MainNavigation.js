import React from "react";
import Link from "next/link";
import Medium from "../svg/Medium";

const MainNavigation = () => {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <div>
          <Link href="/" >
            <Medium className="w-28 md:w-36 object-contain cursor-pointer" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-5 text-xs md:text-sm">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">Follow</h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-green-600 text-xs md:text-sm">
        <h3>Sign In</h3>
        <h3 className=" border px-4 py-1 rounded-full border-green-600">Get Started</h3>
      </div>
    </header>
  );
};

export default MainNavigation;
