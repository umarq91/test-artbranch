// src/hooks/useHome.ts
import { useEffect, useState } from "react";
import { useSpring } from "react-spring";
import { UserProfileType } from "../../Types";
import { fetchFeaturedArtists } from "../../utils/api/exploreapi";
import { cards } from "../../utils/constants";

export const useHome = () => {
  const [activeIndex, setactiveIndex] = useState<null | number>(null);
  const [users, setUsers] = useState<UserProfileType[]>([]);

  const cardSprings = cards.map((card, index) =>
    useSpring({
      opacity: activeIndex === card.id ? 1 : 0.5,
      transform: activeIndex === card.id ? "scale(1.0)" : "scale(0.8)",
      config: { tension: 300, friction: 20 },
    }),
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchFeaturedArtists();
      console.log(data);
      if (data) {
        setUsers(data);
      }
    };
    fetchUsers();
  }, []);

  return {
    activeIndex,
    setactiveIndex,
    cardSprings,
    users,
  };
};
