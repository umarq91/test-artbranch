import React, { ReactNode } from "react";

interface PictureLayoutProps {
  title: string;
  backgroundImage: string;
  decorationImage: string;
  children?: ReactNode;
}

const PictureLayout: React.FC<PictureLayoutProps> = ({
  title,
  backgroundImage,
  decorationImage,
  children,
}) => {
  return (
    <div className="grid min-h-screen grid-cols-1 items-center bg-gray-50 md:grid-cols-2">
      <div className="relative h-full w-full">
        <img
          src={backgroundImage}
          alt="Background"
          className="h-full w-full rounded-b-2xl object-cover lg:rounded-br-3xl lg:rounded-tr-3xl"
        />
        <div className="shadow- absolute inset-0 flex items-center justify-center border px-4 text-center text-2xl font-bold leading-10 tracking-wider text-white md:px-16 md:py-28 md:text-4xl">
          <h1 className="shadow-lg">
            {" "}
            Find all creativity you need in Australia's dedicated Artist
            Directory
          </h1>
        </div>
      </div>
      <div className="p-6 md:p-16">{children}</div>
    </div>
  );
};

export default PictureLayout;
