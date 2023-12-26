import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

// export default function MainMenu() {
//   return (
//     <div
//       id="main-menu"
//       className="fixed inset-0 scale-0 transition ease-in-out duration-500 m-4 rounded-md p-4 border bg-white "
//     >
//       <div className="menu-header flex place-content-between">
//         <span className="flex items-center">
//           <Image width={30} height={30} src="/logo.png" alt="logo" />
//           <h1 className="text-3xl mx-2 font-bold">Kicket</h1>
//         </span>
//         <XMarkIcon
//           id="x-mark-icon"
//           className="h-8 w-8 hover:opacity-40 cursor-pointer flex-shrink-0 text-gray-900"
//           aria-hidden="true"
//         />
//       </div>
//       <div className="flex h-full transition delay-150 duration-300 ease-in-out justify-center items-center">
//         <ul>
//           <li className="text-4xl font-semibold mb-6 hover:text-teal-500">
//             Home
//           </li>
//           <li className="text-4xl font-semibold mb-6 hover:text-teal-500">
//             My Cards
//           </li>
//           <li className="text-4xl font-semibold mb-6 hover:text-teal-500">
//             Lending
//           </li>
//           <li className="text-4xl font-semibold mb-6 hover:text-teal-500">
//             About
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

export default function MainMenu() {
  return (
    <nav id="menu" className="main-menu after:bg-teal-500 before:bg-teal-500">
      <ul className="nav">
        <li className="nav__item">
          <a href="https://codepen.io/hallonanton/" target="_blank">
            Home
          </a>
        </li>
        <li className="nav__item">
          <a href="https://codepen.io/hallonanton/" target="_blank">
            About
          </a>
        </li>
        <li className="nav__item">
          <a href="https://codepen.io/hallonanton/" target="_blank">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
