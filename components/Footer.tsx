import React from "react";
import useAuth from "../hooks/useAuth";

const Footer = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <footer className="absolute left-[50%] -translate-x-1/2 h-20 flex flex-col items-center justify-center md:h-28 w-full">
      <p className="text-[#717171] font-light">Filmpire App</p>
      <p className="text-[#717171] font-light">Created By Nikolay Bondarenko</p>
    </footer>
  );
};

export default Footer;
