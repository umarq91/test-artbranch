import PageMeta from "Components/PageMeta";
import Tabs from "./Tabs";

const TermsAndConditions = () => {
  return (
    <>
      <PageMeta
        title="Terms & Conditions – User Agreement | Artbranch"
        description="Review Artbranch’s Terms & Conditions to understand your rights, responsibilities, and the guidelines for using our platform."
      />

      <Tabs />
      <div className="m-8 mx-auto max-w-6xl rounded-lg p-6">
        <h1 className="mb-4 text-3xl font-bold">Terms and Conditions (T&Cs)</h1>
        <p className="mb-4 text-gray-600">
          Effective Date: 06 Dec 2024 | Last Updated: 09 Dec 2024
        </p>
        <p className="mb-4">
          Welcome to Art Branch, operated by Art Branch Technologies ABN: 54 682
          787 186. By accessing or using our platform ("Platform"), you agree to
          comply with and be bound by these Terms and Conditions. If you do not
          agree, please discontinue using the Platform immediately.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">1. Definitions</h2>
        <ul className="mb-4 ml-6 list-disc">
          <li>
            <strong>Platform:</strong> Art Branch's website and associated
            services.
          </li>
          <li>
            <strong>Artist:</strong> Users approved to create accounts to
            showcase their portfolios.
          </li>
          <li>
            <strong>Audience:</strong> Users who browse, engage with, or contact
            Artists.
          </li>
          <li>
            <strong>Content:</strong> Any text, images, videos, or materials
            uploaded by Artists.
          </li>
        </ul>

        <h2 className="mb-2 mt-6 text-xl font-semibold">2. User Obligations</h2>
        <ul className="mb-4 ml-6 list-disc">
          <li>
            Artists must provide accurate and verifiable information during
            registration.
          </li>
          <li>
            Art Branch reserves the right to approve or reject Artist
            applications.
          </li>
          <li>
            Users must maintain account security and report unauthorized access.
          </li>
          <li>
            Users must not post illegal, defamatory, or infringing content.
          </li>
        </ul>

        <h2 className="mb-2 mt-6 text-xl font-semibold">
          3. Content Ownership and Usage
        </h2>
        <ul className="mb-4 ml-6 list-disc">
          <li>
            Artists retain ownership of their content but grant Art Branch a
            license to display it.
          </li>
          <li>
            Prohibited content includes hate speech and copyright violations.
          </li>
          <li>Art Branch may remove content violating these Terms.</li>
        </ul>

        <h2 className="mb-2 mt-6 text-xl font-semibold">
          4. Intellectual Property
        </h2>
        <ul className="mb-4 ml-6 list-disc">
          <li>Art Branch owns Platform-related intellectual property.</li>
          <li>
            Users cannot claim rights to Art Branch’s branding or features.
          </li>
        </ul>

        <h2 className="mb-2 mt-6 text-xl font-semibold">
          5. Account Activity and Termination
        </h2>
        <ul className="mb-4 ml-6 list-disc">
          <li>
            Artist accounts inactive for six months may be terminated with
            notice.
          </li>
          <li>Accounts may also be suspended for Terms violations.</li>
        </ul>

        <h2 className="mb-2 mt-6 text-xl font-semibold">
          6. Liability Limitations
        </h2>
        <p className="mb-4">
          Art Branch is not liable for user content or collaborations. Liability
          is limited to the extent permitted by Australian law.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">7. Indemnification</h2>
        <p className="mb-4">
          Users agree to indemnify Art Branch against claims arising from
          violations of these Terms or user disputes.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">8. Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by the laws of South Australia. Disputes will
          be handled in Adelaide courts.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">9. Changes to Terms</h2>
        <p className="mb-4">
          Art Branch may update these Terms. Continued use of the Platform
          indicates acceptance of updates.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">
          10. Privacy and Data Use
        </h2>
        <p className="mb-4">
          Art Branch complies with the Australian Privacy Act 1988. See our{" "}
          <a href="/privacypolicy" className="text-blue-600 underline">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
      </div>
    </>
  );
};

export default TermsAndConditions;
