import React from "react";
import { NotificationType } from "Types";

type Props = {
  type: NotificationType;
};

const NotificationIcon: React.FC<Props> = ({ type }) => {
  const iconMap: Record<NotificationType, JSX.Element> = {
    like: <div className="rounded-full bg-blue-100 p-2 text-blue-600">👍</div>,
    comment: (
      <div className="rounded-full bg-green-100 p-2 text-green-600">💬</div>
    ),
    follow: (
      <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">➕</div>
    ),
    reply: <div className="rounded-full bg-pink-100 p-2 text-pink-600">↩️</div>,
    post: (
      <div className="rounded-full bg-purple-100 p-2 text-purple-600">📤</div>
    ),
    collab_request: (
      <div className="rounded-full bg-orange-100 p-2 text-orange-600">🤝</div>
    ),
    collab_accept: (
      <div className="rounded-full bg-teal-100 p-2 text-teal-600">✔️</div>
    ),
    account_activated: (
      <div className="rounded-full bg-indigo-100 p-2 text-indigo-600">🎉</div>
    ),
    you_accepted: (
      <div className="rounded-full bg-lime-100 p-2 text-lime-600">✅</div>
    ),
  };

  return (
    iconMap[type] || <div className="rounded-full bg-gray-100 p-2">❓</div>
  );
};

export default NotificationIcon;
