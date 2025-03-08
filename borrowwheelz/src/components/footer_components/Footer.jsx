import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-center py-4 text-white text-sm">
      <p>
        © Copyright {new Date().getFullYear()}{" "}
        <span className="text-yellow-500 font-semibold">Borrow Wheelz</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
