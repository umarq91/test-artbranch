// src/components/AnimatedUsers.tsx

import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";

type UserProfileType = {
  id: number;
  profile: string;
  full_name: string;
  is_verified: boolean;
  category: string;
};

type AnimatedUsersProps = {
  users: UserProfileType[];
};

const AnimatedUsers: React.FC<AnimatedUsersProps> = ({ users }) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      style={{ width: "auto", height: "400px" }}
    >
      {users.map((user) => {
        // Animation for each card based on whether it's active
        const cardSpring = useSpring({
          opacity: active === user.id ? 1 : 0.5,
          transform: active === user.id ? "scale(0.9)" : "scale(0.7)",
          config: { tension: 300, friction: 20 },
        });

        return (
          <Link
            to={`/portfolio/${user.id}`}
            key={user.id}
            className="relative mx-3 w-full flex-none cursor-pointer snap-center p-5 md:w-1/3"
          >
            <animated.div
              style={{ ...cardSpring, width: "300px", height: "300px" }}
              onMouseOver={() => setActive(user.id)}
              onMouseLeave={() => setActive(null)}
              className="relative"
            >
              <img
                src={user.profile}
                alt="Artist Image"
                className="h-full w-full rounded-full object-cover shadow-lg"
              />
              <div className="absolute bottom-5 right-5 rounded-lg bg-white bg-opacity-90 p-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="shrink-0">
                    <img
                      src={user.profile}
                      alt="Avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-md font-bold">
                      {user.full_name}{" "}
                      {user.is_verified && (
                        <FaCheckCircle
                          className="inline-block h-3 w-3 text-blue-500"
                          title="Verified"
                        />
                      )}
                    </h3>
                    <p className="w-12 rounded-xl bg-primary-100 text-xs text-[#000000]">
                      {user.category}
                    </p>
                  </div>
                </div>
              </div>
            </animated.div>
          </Link>
        );
      })}
    </div>
  );
};

export default AnimatedUsers;
