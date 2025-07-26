import PageMeta from "Components/PageMeta";
import { motion } from "framer-motion";
import Tabs from "./Tabs";

export default function PrivacyPolicy() {
  return (
    <>
      <PageMeta
        title="Privacy Policy"
        description="Read Artbranch’s Privacy Policy to learn how we collect, use, and protect your data while ensuring a secure and transparent experience."
      />

      <Tabs />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-6 text-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl rounded-lg p-8"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold text-gray-800"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-2 text-gray-500"
            >
              Effective Date: 06 Dec 2024 | Last Updated: 09 Dec 2024
            </motion.p>
          </div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-gray-700">
              Art Branch Technologies (ABN: 54 682 787 186) (“Art Branch,” “we,”
              “us,” or “our”) respects your privacy and is committed to
              protecting it. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your personal information in compliance
              with the Australian Privacy Act 1988 (Cth) and other relevant
              laws.
            </p>
            <p className="mt-4 text-gray-700">
              By accessing or using our platform (“Platform”), you agree to the
              practices described in this Privacy Policy.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {/* Section 1: Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                1. Information We Collect
              </h2>
              <p className="mt-2 text-gray-700">
                We collect personal and non-personal information to provide,
                improve, and secure our services.
              </p>
              <div className="mt-4 pl-6">
                <h3 className="text-xl font-medium text-gray-800">
                  1.1 Personal Information
                </h3>
                <p className="mt-2 text-gray-700">
                  This includes:
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      Contact Details: Name, email address, phone number, and
                      mailing address.
                    </li>
                    <li>
                      Account Information: Username, password, and profile
                      details.
                    </li>
                    <li>
                      Verification Data: Documentation or portfolio samples
                      submitted for Artist applications.
                    </li>
                    <li>
                      Financial Information: Payment details (where applicable).
                    </li>
                  </ul>
                </p>
                <h3 className="mt-4 text-xl font-medium text-gray-800">
                  1.2 Non-Personal Information
                </h3>
                <p className="mt-2 text-gray-700">
                  This includes:
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      Browser type, device details, IP address, and location
                      data.
                    </li>
                    <li>
                      Usage data, such as pages visited, time spent on the
                      Platform, and interactions with content.
                    </li>
                  </ul>
                </p>
              </div>
            </motion.div>

            {/* Section 2: How We Collect Information */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                2. How We Collect Information
              </h2>
              <div className="mt-4 pl-6">
                <h3 className="text-xl font-medium text-gray-800">
                  2.1 Directly from You
                </h3>
                <ul className="list-inside list-disc space-y-1">
                  <li>During account registration.</li>
                  <li>
                    When submitting content or applying for Artist approval.
                  </li>
                  <li>Through communications with our support team.</li>
                </ul>
                <h3 className="mt-4 text-xl font-medium text-gray-800">
                  2.2 Automatically
                </h3>
                <p className="mt-2 text-gray-700">
                  Via cookies, web beacons, and tracking technologies when you
                  use the Platform.
                </p>
                <h3 className="mt-4 text-xl font-medium text-gray-800">
                  2.3 From Third Parties
                </h3>
                <ul className="list-inside list-disc space-y-1">
                  <li>Social media platforms, if you link accounts.</li>
                  <li>Payment processors for financial transactions.</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mt-8 border-t pt-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              12. Contact Us
            </h2>
            <p className="mt-2 text-gray-700">
              For questions, concerns, or privacy-related requests, reach out to
              us at:
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Art Branch Technologies</strong>
              <br />
              Email:{" "}
              <a
                href="mailto:privacy@artbranch.com.au"
                className="text-purple-600 hover:underline"
              >
                privacy@artbranch.com.au
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
