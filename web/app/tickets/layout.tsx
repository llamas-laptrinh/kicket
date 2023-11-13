import React from "react";

export default function KicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center w-full h-full">
      <div className="z-10 p-8 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {children}
      </div>
    </main>
  );
}
