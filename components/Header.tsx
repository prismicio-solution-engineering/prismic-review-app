"use client";
import { useState } from "react";
import { NavigationDocumentData } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { Button } from "./Button";

export default function Header({ navigation }: NavigationDocumentData) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white p-4 shadow w-full">
      <div
        className={`${isMobileMenuOpen ? "pt-4 mx-auto flex flex-wrap justify-between" : "container mx-auto flex items-center justify-between"}`}
      >
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-[#151515] w-40">
          <PrismicNextImage
            field={navigation.data.logo}
            fallbackAlt=""
            width={250}
          />
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-800 md:hidden w-6"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        {/* <div className="hidden md:flex items-center space-x-4"> */}
        <nav
          className={`${isMobileMenuOpen ? "block md:hidden w-full" : "hidden md:flex items-center space-x-4"}`}
        >
          {navigation.data.slices1 && (
            <SliceZone
              slices={navigation.data.slices1}
              components={components}
              context={isMobileMenuOpen}
            />
          )}
        </nav>
        <Button button href="/login" variant="primary" color="black" disabled>
          Sign in
        </Button>
      </div>

      {/* Mobile Menu */}
      {/* <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <nav className="bg-white p-4">
          <div className="flex items-center border-2 border-gray-300 p-1 mt-4 w-full">
            <input
              type="text"
              className="bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
              placeholder="Search"
            />
            <SearchIcon className="h-5 w-5 text-gray-700" />
          </div>
        </nav>
      </div> */}
    </header>
  );
}
