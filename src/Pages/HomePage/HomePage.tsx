import { useUserInfo } from "context/UserInfoContext";
import ExplorePage from "Pages/Explore/ExplorePage";
import Home from "./Home";

function HomePage() {
  const { userInfo } = useUserInfo();

  if (userInfo) {
    return <ExplorePage />;
  }

  return (
    <div>
      <Home />
    </div>
  );
}

export default HomePage;
