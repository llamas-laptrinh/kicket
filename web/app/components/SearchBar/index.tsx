import React from 'react';

import { IoIosSearch } from 'react-icons/io';

export default function SearchBar() {
  return (
    <div className="flex justify-center items-center gap-2 border rounded px-4">
      <IoIosSearch className="w-6 h-6" />
      <input
        className="search-bar px-0 w-full bg-transparent shadow-none focus:outline-none border-none"
        type="text"
        placeholder="Search by name"
      />
    </div>
  );
}
