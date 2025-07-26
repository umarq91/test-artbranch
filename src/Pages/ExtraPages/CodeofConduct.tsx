import PageMeta from "Components/PageMeta";
import Tabs from "./Tabs";

export default function CodeOfConduct() {
  return (
    <>
      <PageMeta
        title="Code of Conduct"
        description="Review Artbranch’s Code of Conduct to understand our community guidelines, ethical standards, and expectations for respectful interactions."
      />

      <Tabs />
      <div className="m-8 mx-auto max-w-6xl rounded-lg p-6">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Art Branch Code of Conduct
        </h1>
        <p className="mb-4 text-gray-700">
          At Art Branch, we are committed to fostering a supportive, inclusive,
          and inspiring space where creativity, collaboration, and community can
          flourish. To maintain a positive and respectful environment, we expect
          every member to adhere to the following principles.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              1. Respectful Communication
            </h2>
            <ul className="list-inside list-disc text-gray-700">
              <li>
                Treat all users with dignity and respect, regardless of their
                background, opinions, or creative work.
              </li>
              <li>
                Refrain from using language or behavior that is offensive,
                abusive, discriminatory, or inflammatory.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              2. Zero Tolerance for Harassment and Bullying
            </h2>
            <ul className="list-inside list-disc text-gray-700">
              <li>
                Harassment, intimidation, or any form of bullying—whether public
                or private—will not be tolerated.
              </li>
              <li>
                This includes targeting individuals based on race, gender,
                sexual orientation, disability, religion, or personal beliefs.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              3. Constructive Engagement
            </h2>
            <ul className="list-inside list-disc text-gray-700">
              <li>
                Offer feedback in a constructive and supportive manner that
                encourages artistic growth.
              </li>
              <li>
                Avoid personal attacks, unwarranted criticism, or negative
                commentary that discourages creativity.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              4. Protection of Creativity & Intellectual Property
            </h2>
            <ul className="list-inside list-disc text-gray-700">
              <li>Respect the intellectual property of all artists.</li>
              <li>
                Do not steal, plagiarize, or misuse another artist’s work.
              </li>
              <li>
                If sharing or referencing another artist’s work, provide proper
                credit.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              5. Accountability & Community Integrity
            </h2>
            <ul className="list-inside list-disc text-gray-700">
              <li>
                Report any inappropriate behavior or content to Art Branch
                administrators.
              </li>
              <li>
                Understand that breaches of this Code of Conduct may result in
                warnings, content removal, suspension, or permanent account
                bans.
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Our Commitment
          </h2>
          <p className="text-gray-700">
            Art Branch reserves the right to investigate any reports of
            misconduct and take appropriate action to ensure the platform
            remains a safe, inclusive, and positive space for all.
          </p>
          <p className="mt-2 text-gray-700">
            By engaging with Art Branch, you agree to uphold these principles
            and contribute to a culture of respect, collaboration, and artistic
            excellence.
          </p>
        </div>
      </div>
    </>
  );
}
