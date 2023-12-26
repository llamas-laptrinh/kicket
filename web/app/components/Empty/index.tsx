import React from 'react';

export default function Empty() {
  return (
    <div className="text-center p-4">
      <p className="text-2xl font-semibold">No items found</p>
      <button className="px-4 py-2 rounded-md bg-white hover:bg-gray-400 border my-4">
        Back to all
      </button>
    </div>
  );
}
