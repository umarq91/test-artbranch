// src/components/Layout.jsx
import AboutPage from "Pages/ExtraPages/AboutPage";
import AcknowledgementPage from "Pages/ExtraPages/Acknowledgement";
import CodeOfConduct from "Pages/ExtraPages/CodeofConduct";
import PrivacyPolicy from "Pages/ExtraPages/PrivacyAndPolicy";
import TermsAndConditions from "Pages/ExtraPages/TermsAndConditions";
import { useState } from "react";

const LayoutForTabs = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About Us" },
    { id: "code", label: "Code of Conduct" },
    { id: "acknowledgements", label: "Acknowledgements" },
    { id: "terms", label: "Terms and Conditions" },
    { id: "privacy", label: "Privacy Policy" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <AboutPage />;
      case "code":
        return <CodeOfConduct />;
      case "acknowledgements":
        return <AcknowledgementPage />;
      case "terms":
        return <TermsAndConditions />;
      case "privacy":
        return <PrivacyPolicy />;
      default:
        return <AboutPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white">
        <h1 className="text-2xl font-bold">Company Name</h1>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar with Tabs */}
        <nav className="w-64 bg-white p-4 shadow-lg">
          <ul>
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`mb-2 cursor-pointer rounded-lg p-3 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  );
};

export default LayoutForTabs;
