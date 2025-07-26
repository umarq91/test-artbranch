import { useEffect, useState } from "react";
import logo from "../assets/newLogo.png";
import profileIcon1 from "../assets/profileicon1.png";
import profileIcon2 from "../assets/profileicon2.png";
import profileIcon3 from "../assets/profileicon3.png";

const DashboardOverview = () => {
  const notifications = [
    {
      message: "Natali just joined as artist",
      subtext: "Click to view",
      time: "Just now",
    },
    { message: "New user registered.", subtext: "", time: "59 minutes ago" },
    { message: "You fixed a bug.", subtext: "", time: "12 hours ago" },
    {
      message: "Andi Lane subscribed to Leave.",
      subtext: "",
      time: "Today, 11:59 AM",
    },
  ];

  const activities = [
    {
      message: "You've accepted Natali",
      subtext: "",
      time: "Just now",
      image: profileIcon1,
    },
    {
      message: "Released a new version.",
      subtext: "",
      time: "59 minutes ago",
      image: profileIcon2,
    },
    {
      message: "Submitted a bug.",
      subtext: "",
      time: "12 hours ago",
      image: profileIcon3,
    },
    {
      message: "Modified A data in Page X.",
      subtext: "",
      time: "Today, 11:59 AM",
      image: profileIcon2,
    },
    {
      message: "Deleted a page in Project X.",
      subtext: "",
      time: "Feb 2, 2024",
      image: profileIcon3,
    },
  ];

  const latestArtists = [
    { name: "Natali Craig", image: profileIcon1, time: "Today" },
    { name: "Drew Cano", image: profileIcon2, time: "Yesterday" },
    { name: "Andi Lane", image: profileIcon3, time: "3 days ago" },
    { name: "Koray Okumus", image: profileIcon1, time: "Last week" },
    { name: "Kate Morrison", image: profileIcon2, time: "2 weeks ago" },
    { name: "Melody Macy", image: profileIcon3, time: "Last month" },
  ];

  //for toggle days
  const [activeLink, setActiveLink] = useState("Overview");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 30 Days");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectRange = (range: any) => {
    setSelectedRange(range);
    setIsOpen(false);
  };

  // for overview fields
  const [data, setData] = useState({
    users: { count: 0, change: 0 },
    portfolios: { count: 0, change: 0 },
    artists: { count: 0, change: 0 },
    payments: { count: 0, change: 0 },
  });

  // Simulate fetching data
  useEffect(() => {
    const fetchData = () => {
      // Dummy data
      const dummyData = {
        users: { count: 7254, change: 11.02 },
        portfolios: { count: 3412, change: -3.24 },
        artists: { count: 154, change: 5.67 },
        payments: { count: 2454, change: 2.68 },
      };

      // Update the state with dummy data after 1 second
      setTimeout(() => {
        setData(dummyData);
      }, 1000);
    };

    fetchData();
  }, []);

  // Helper function to format change percentage
  const formatChange = (change: any) => {
    return `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
  };

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = () => {
      const dummyData = [
        { name: "Jan", thisYear: 10000, lastYear: 8000 },
        { name: "Feb", thisYear: 12000, lastYear: 9000 },
        { name: "Mar", thisYear: 18000, lastYear: 14000 },
        { name: "Apr", thisYear: 22000, lastYear: 18000 },
        { name: "May", thisYear: 21000, lastYear: 20000 },
        { name: "Jun", thisYear: 24000, lastYear: 22000 },
        { name: "Jul", thisYear: 26000, lastYear: 25000 },
      ];
      setChartData(dummyData);
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="w-full border-b border-gray-300 bg-gray-100 p-4 md:w-52 md:border-b-0 md:border-r">
        <div className="mb-8">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-16 w-36" />
        </div>
        <nav>
          <ul className="space-y-4">
            <li className="text-lg font-semibold text-black opacity-40">
              Dashboard
            </li>
            <li
              className={`font-small flex items-center rounded-lg p-2 text-base ${
                activeLink === "Overview"
                  ? "bg-[#EEEAE4] font-bold text-black"
                  : ""
              }`}
            >
              <span className="mr-2 h-3 w-3 rounded-full bg-[#e0d7d7]"></span>
              <a
                href="/overview"
                onClick={() => setActiveLink("Overview")}
                className="flex-1"
              >
                Overview
              </a>
            </li>

            <li
              className={`font-small flex items-center rounded-lg p-2 text-base ${
                activeLink === "Subscriptions"
                  ? "bg-[#EEEAE4] font-bold text-black"
                  : ""
              }`}
            >
              <span className="mr-2 h-3 w-3 rounded-full bg-[#e0d7d7]"></span>
              <a
                href="/subscriptions"
                onClick={() => setActiveLink("Subscriptions")}
                className="flex-1"
              >
                Subscriptions
              </a>
            </li>

            <li
              className={`font-small flex items-center rounded-lg p-2 text-base ${
                activeLink === "Artists"
                  ? "bg-[#EEEAE4] font-bold text-black"
                  : ""
              }`}
            >
              <span className="mr-2 h-3 w-3 rounded-full bg-[#e0d7d7]"></span>
              <a
                href="/artists"
                onClick={() => setActiveLink("Artists")}
                className="flex-1"
              >
                Artists
              </a>
            </li>

            <li
              className={`font-small flex items-center rounded-lg p-2 text-base ${
                activeLink === "Approvals"
                  ? "bg-[#EEEAE4] font-bold text-black"
                  : ""
              }`}
            >
              <span className="mr-2 h-3 w-3 rounded-full bg-[#e0d7d7]"></span>
              <a
                href="/approvals"
                onClick={() => setActiveLink("Approvals")}
                className="flex-1"
              >
                Approvals
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Center Content */}
      <div className="flex w-full flex-1 flex-col p-4 md:p-8">
        {/* Navbar */}
        <div className="mb-8 flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-4">
            {/* Star Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="rgba(0, 0, 0, 0.1)" // 40% black
              stroke="black" // Outline color
              strokeWidth="1"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.396.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.33-.314-.158-.888.283-.95l4.898-.696 2.132-4.387c.197-.404.73-.404.927 0l2.132 4.387 4.898.696c.441.062.613.636.282.95l-3.523 3.356.83 4.73c.078.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span className="text-lg font-semibold text-black opacity-40">
              Dashboards
            </span>
            <span className="text-base font-semibold">Default</span>
          </div>

          <div className="relative">
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 top-3 h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 4a7 7 0 1 0 4.9 11.9l4.4 4.4a1 1 0 0 0 1.4-1.4l-4.4-4.4A7 7 0 0 0 11 4z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md border px-10 py-2 md:w-64"
            />
            <span className="absolute right-2 top-2 text-sm text-gray-500">
              ⌘ /
            </span>
          </div>
        </div>

        {/* Overview Content */}
        <div className="flex-1">
          {/* Overview Content dropdown */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="font-semibold">Overview</div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center font-semibold"
              >
                {selectedRange}
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 bg-white shadow-lg">
                  <ul className="text-gray-700">
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSelectRange("Today")}
                    >
                      Today
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSelectRange("Last 7 Days")}
                    >
                      Last 7 Days
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSelectRange("Last 15 Days")}
                    >
                      Last 15 Days
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSelectRange("Last 30 Days")}
                    >
                      Last 30 Days
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Overview Cards */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(data).map(([key, { count, change }]) => (
              <div
                key={key}
                className="flex flex-col justify-between rounded-lg bg-white p-6 shadow"
              >
                <h3 className="text-sm font-bold capitalize">{key}</h3>

                <div className="flex w-full justify-between bg-white p-6">
                  <div className="flex justify-between">
                    <p className="text-xl font-semibold">
                      {count.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`text-xs font-normal ${
                        change >= 0 ? "text-green-600" : "text-red-600"
                      } flex items-center`}
                    >
                      <svg
                        className={`mr-1 h-3 w-3 fill-current ${
                          change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={change >= 0 ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                        />
                      </svg>
                      {formatChange(change)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts and Graphs */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Other cards */}
              {/* <div className="col-span-4">
                <TotalUsersChart data={chartData} />
            </div> */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="text-sm font-bold">User Chart</h3>
                {/* Traffic by Location Chart Component */}
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-bold">Traffic by Location</h3>
              {/* Traffic by Location Chart Component */}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full border-t border-gray-300 bg-gray-50 p-4 md:w-80 md:border-l md:border-t-0">
        {/* Notifications */}
        <div className="mb-8">
          <h3 className="text-md mb-4 font-semibold">Notifications</h3>
          <ul className="space-y-4">
            {notifications.map((notification, index) => (
              <li key={index}>
                <p className="font-semibold">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.subtext}</p>
                <p className="text-xs text-gray-400">{notification.time}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Activities */}
        <div className="mb-8">
          <h3 className="text-md mb-4 font-semibold">Activities</h3>
          <ul className="space-y-4">
            {activities.map((activity, index) => (
              <li key={index} className="flex items-center">
                <img
                  src={activity.image}
                  alt={activity.message}
                  className="mr-2 h-8 w-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.subtext}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Artists */}
        <div>
          <h3 className="text-md mb-4 font-semibold">Latest Artists</h3>
          <ul className="space-y-2">
            {latestArtists.map((artist, index) => (
              <li key={index} className="flex items-center">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="mr-2 h-8 w-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{artist.name}</p>
                  <p className="text-xs text-gray-400">{artist.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
