import React, { useState } from "react";

const Tooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content?: string | null;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)} // For keyboard focus
      onBlur={() => setVisible(false)} // For losing focus
      role="tooltip"
    >
      {children}
      {visible && content !== null && (
        <div
          className="absolute bottom-full mb-2 w-max rounded bg-gray-800 p-2 text-xs text-white shadow-lg"
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
