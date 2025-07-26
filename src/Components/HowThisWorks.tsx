const HowThisWorks = () => {
  return (
    <div className="space-y-8 p-6 text-gray-800">
      <h1 className="text-center text-3xl font-bold text-gray-900">
        How Artbranch Works
      </h1>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800">For Artists</h2>
        <div className="mt-4 space-y-4">
          <Step
            title="Create Your Portfolio"
            description="Sign up and showcase your work, whether it’s photography, paintings, digital art, music, film, tattoos, sculpture, writing, or any other creative medium. Organise your media into folders or single files, keeping your work easily accessible to visitors on your portfolio page."
          />
          <Step
            title="Share Daily Branch Updates"
            description="Post snapshots of your work or creative process in the public explore feed, allowing you to gain exposure without sharing your full portfolio. Whether it's a behind-the-scenes look, a work-in-progress, or a completed piece, you remain in control of what you share."
          />
          <Step
            title="Engage and Collaborate"
            description="Connect with other artists, find inspiration, and collaborate across different disciplines. Whether you're a visual artist looking for a musician to score your exhibition or a filmmaker in search of a storyboard artist, Art Branch fosters genuine creative partnerships."
          />
          <Step
            title="Get Discovered and Grow"
            description="Make your work easily accessible to event organisers, curators, collectors, businesses, and art lovers who are actively seeking talent. With optimised discoverability, your art reaches the right audience without the reliance on social media algorithms."
          />
          <Step
            title="Opportunities Beyond Social Media"
            description="Unlike traditional platforms, Art Branch isn’t built around likes and trends—it’s built for artists to gain real opportunities, commissions, and collaborations."
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800">
          For Communities, Businesses, and Event Organisers
        </h2>
        <div className="mt-4 space-y-4">
          <Step
            title="Search and Discover Talent"
            description="Use our powerful search tool to find artists based on location, medium, or artistic style."
          />
          <Step
            title="Stay Inspired with Daily Branch Posts"
            description="Browse real-time updates from Australian artists, gaining insights into their creative journeys and discovering emerging talent before they break into the mainstream."
          />
          <Step
            title="Connect, Hire, and Commission Work"
            description="Directly contact artists for commissions, live performances, murals, exhibitions, album covers, illustrations, and more. Art Branch simplifies the process of finding and working with Australian creatives."
          />
          <Step
            title="Support and Build the Arts Community"
            description="Follow your favourite artists, leave meaningful feedback, and actively contribute to Australia’s thriving creative ecosystem. Art Branch isn’t just a directory—it’s a place to support local talent and foster artistic growth."
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800">
          Why Art Branch Stands Out
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>
            <strong>No Social Media Pressure:</strong> Focus on your craft
            without chasing engagement metrics.
          </li>
          <li>
            <strong>A Curated Space for Artists:</strong> Designed specifically
            for creatives, not diluted by unrelated content.
          </li>
          <li>
            <strong>Direct Connections:</strong> Skip the middleman and interact
            directly with potential clients, event organisers, and fellow
            artists.
          </li>
          <li>
            <strong>Support for Emerging and Established Talent:</strong>{" "}
            Whether you're just starting out or a seasoned professional, Art
            Branch helps you grow your audience and opportunities.
          </li>
        </ul>
      </section>

      <section className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Bringing Art and Opportunity Together
        </h2>
        <p className="mt-4 text-gray-600">
          Art Branch is more than just a platform - it’s a creative ecosystem
          designed to help artists thrive. Whether you want to showcase your
          work, find new talent, or collaborate on exciting projects, Art Branch
          provides the space to bring creativity to life.
        </p>
      </section>
    </div>
  );
};

const Step = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default HowThisWorks;
