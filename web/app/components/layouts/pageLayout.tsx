import React, { ReactNode } from "react";
import MainMenu from "../menu";
import Loader from "../Loader";

type PageLayoutProps = {
  onBack?: () => void;
  onButtonClick?: () => void;
  title: string;
  buttonTitle?: string;
  children?: ReactNode;
};

export default function PageLayout({
  onBack,
  onButtonClick,
  title,
  children,
  buttonTitle,
}: PageLayoutProps) {
  return (
    <>
      <MainMenu />
      <div className="flex header place-content-between">
        {/* <svg
          onClick={onBack}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hover:opacity-20 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg> */}
        <span />
        <svg
          id="btn"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 absolute top-2 right-2 z-10 bg-white rounded-sm font-semibold hover:opacity-20 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <p className="my-6 font-semibold text-gray-400">{title}</p>
      <div className="ticket-content w-full scrollbar-hide overflow-y-scroll h-96">
        {children}
      </div>
      {buttonTitle && (
        <div className="action mt-4">
          <button
            onClick={onButtonClick}
            className="px-6 py-2 text-teal-100 rounded bg-gradient-to-r from-teal-600 to-teal-400 bg-cyan-500 shadow-lg shadow-cyan-500/50"
          >
            {buttonTitle}
          </button>
        </div>
      )}
    </>
  );
}
