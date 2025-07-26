import { useUserInfo } from "context/UserInfoContext";
interface HeaderProp {
  activeTab: string;
}
function Header({ activeTab }: HeaderProp) {
  const format =
    activeTab.charAt(0).toUpperCase() +
    activeTab.slice(1).replace(/([A-Z])/g, " $1"); // convert first letter to Capital

  const { userInfo } = useUserInfo();

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row">
      {/* Left Side */}
      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <img
          src={userInfo?.profile}
          alt="Artist"
          autoSave="false"
          className="h-20 w-20 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">
              {userInfo?.full_name || ""}
            </h2>
            <p className="text-gray-300">|</p>
            <h2 className="text-2xl font-semibold">{format}</h2>
          </div>
          <p className="text-sm text-gray-500">
            Update your profile and press save for confirmation
          </p>
        </div>
      </div>
      {/* Right Side */}
      {/* <div className='flex-shrink-0 hidden md:block'>
        
        </div> */}
    </div>
  );
}

export default Header;
