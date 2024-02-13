import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[50px] sm:h-[60px] border-b border-neutral-300 py-2 px-2 sm:px-8 items-center justify-between">
      <div className="flex items-center">
        <a 
          href="https://github.com/sarveshrbabu/pharm" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="ml-2 hover:opacity-50 cursor-pointer"
        >
          <img
            src="/images/logo.png"
            alt="PharmD"
            className="w-36 h-auto"
          />
        </a>
      </div>
    </div>
  );
};
