import { motion } from "framer-motion";
import  React,{
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import logo from "../assets/newLogo.png";
import { UserProfileType } from "../Types";
import { UserRepository } from "../utils/repositories/userRepository";

type UserProfileContextType = {
  userInfo: UserProfileType | null;
  setUserInfo: Dispatch<SetStateAction<UserProfileType | null>>;
  loading: boolean;
  temporaryUserInfo: UserProfileType | null;
  setTemporaryUserInfo: Dispatch<SetStateAction<UserProfileType | null>>;
  resetTemporaryUserInfo: (userInfo: UserProfileType | null) => void;
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined,
);

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [temporaryUserInfo, setTemporaryUserInfo] =
    useState<UserProfileType | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const user = await UserRepository.fetchLoggedInUser();
        if (user) {
          const profile = await UserRepository.getUserInfo(user?.id);
          
          setUserInfo(profile);
          setTemporaryUserInfo(profile);
        } else {
          setUserInfo(null);
          setTemporaryUserInfo(null);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        setUserInfo(null);
        setTemporaryUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []); // Only run on mount, no need for userInfo in the dependency array

  const resetTemporaryUserInfo = (userInfo: UserProfileType | null) => {
    setTemporaryUserInfo(userInfo);
  };

  return (
    <UserProfileContext.Provider
      value={{
        userInfo,
        setUserInfo,
        loading,
        temporaryUserInfo,
        setTemporaryUserInfo,
        resetTemporaryUserInfo,
      }}
    >
      {loading ? <LoadingSpinner /> : children}
    </UserProfileContext.Provider>
  );
};

const LoadingSpinner = () => {
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.img
        src={logo}
        alt="Loading"
        className="h-40 w-40"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
};
