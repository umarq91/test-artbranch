import React from "react";

const NotificationItemSkeleton: React.FC = () => {
  return (
    <li className="flex items-start border-b border-gray-200 p-4 hover:bg-gray-50">
      <div className="mr-4 flex-shrink-0">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300"></div>
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
        <div className="mt-2 h-3 w-1/4 animate-pulse rounded bg-gray-200"></div>
      </div>
    </li>
  );
};

export default NotificationItemSkeleton;
