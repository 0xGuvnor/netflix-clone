import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiSearch, HiBell } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import Menu from "./Menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isScrolled && "bg-stone-800/95 transition duration-500 ease-in-out"
      }`}
    >
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src="https://rb.gy/ulxxee"
          alt="Netflix Logo"
          width={100}
          height={100}
          className="object-contain cursor-pointer"
        />

        <Menu />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">Series</li>
          <li className="headerLink">Films</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <HiSearch className="hidden w-6 h-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <HiBell className="w-6 h-6" />
        <Link href="/account">
          <Image
            src="https://rb.gy/g1pwyx"
            alt="Profile Picture"
            width={28}
            height={28}
            className="rounded"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
