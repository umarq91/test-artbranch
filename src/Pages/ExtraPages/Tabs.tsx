import { useState } from "react";
import { Link } from "react-router-dom";

function Tabs() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About Us", href: "/about-us" },
    { id: "code", label: "Code of Conduct", href: "/cod" },
    {
      id: "acknowledgements",
      label: "Acknowledgements",
      href: "/acknowledgement",
    },
    { id: "terms", label: "Terms and Conditions", href: "/termsconditions" },
    { id: "privacy", label: "Privacy Policy", href: "/privacypolicy" },
  ];

  return (
    <div className="bg-yellow-100 p-4">
      <div className="mx-auto max-w-[1400px]">
        <nav>
          <ul className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`mb-2 min-w-[100px] cursor-pointer rounded-lg px-4 py-2 text-center text-gray-700`}
              >
                <Link to={tab.href}>{tab.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Tabs;
