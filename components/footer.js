import React from "react";

const Footer = () => {
  return (
    <main>
      <footer className=" bg-black  bottom-0 mt-[10vh] rounded-t-2xl  dark:bg-white">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-white sm:text-center dark:text-black">
            © 2024{" "}
            <a href="https://jotishsharma.in" className="hover:underline">
              Jotish™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-black sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Common Number
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Dream Number
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Previous Result
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
};

export default Footer;
