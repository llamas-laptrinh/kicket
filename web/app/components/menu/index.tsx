import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function MainMenu() {
  return (
    <div className="fixed inset-0 m-4 rounded-md p-4 border bg-white transition duration-150 ease-out hover:ease-in">
      <div className="menu-header flex place-content-between">
        <span className="flex items-center">
          <Image width={30} height={30} src="/logo.png" alt="logo" />
          <h1 className="text-3xl mx-2 font-bold">Kicket</h1>
        </span>
        <XMarkIcon
          className="h-8 w-8 hover:opacity-40 cursor-pointer flex-shrink-0 text-gray-900"
          aria-hidden="true"
        />
      </div>
      <div className="flex h-full justify-center items-center">
        <ul>
          <li className="text-4xl font-semibold mb-6 hover:text-teal-500">
            Home
          </li>
          <li className="text-4xl font-semibold mb-6 hover:text-teal-500">
            My Cards
          </li>
          <li className="text-4xl font-semibold mb-6 hover:text-teal-500">
            Lending
          </li>
          <li className="text-4xl font-semibold mb-6 hover:text-teal-500">
            About
          </li>
        </ul>
      </div>
    </div>
  );
}
