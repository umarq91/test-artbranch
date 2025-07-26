import { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "For Everyone",
      questions: [
        {
          question: "What is Art Branch?",
          answer:
            "Art Branch is Australia’s dedicated artist search directory, connecting artists with local audiences, event coordinators, and fellow creatives. It allows artists to showcase their work and be discovered by an engaging creative feed, or filtered by location, art form, and keywords.",
        },
        {
          question: "Who can join Art Branch?",
          answer:
            "Any Australian-based artist from any field can join—including, but not limited to, visual artists, musicians, dancers, tattoo artists, filmmakers, photographers, and performers.",
        },
        {
          question: "How do I find an Artist on Art Branch?",
          answer:
            "You can search by:\n✓ Location – find artists near you\n✓ Art form - Browse by category (e.g., painters, dancers, musicians).\n✓ Keywords – Use specific terms like “wedding photographer” or “mural artist”.\n✓ Daily Branch posts – see fresh real-time updates from artists across Australia.",
        },
        {
          question: "Can I save artists or posts for later?",
          answer:
            "Yes! You can follow artists by subscribing or save posts to your Inspiration tab, making it easy to keep track of creatives you love.",
        },
        {
          question: "Who do I contact for more information?",
          answer:
            "Reach out to us via our feedback form located in the ‘contact us’ section, and our support team will endeavor to promptly assist you. We truly appreciate your presence and contribution to Art Branch becoming Australia’s leading Artist Directory!",
        },
      ],
    },
    {
      category: "Technical and Support",
      questions: [
        {
          question: "What if there is a bug or I am experiencing an issue?",
          answer:
            "We are in the early stages of growing our platform, and we want to make it easy for you to let us know if something is wrong. Please go to the ‘contact us’ section to locate our feedback form and know that we welcome any form of feedback and will actively make every effort to assist.",
        },
        {
          question: "What kind of feedback are you looking for?",
          answer:
            "We welcome all kinds of feedback, including suggestions for new features, reporting technical issues, or sharing ideas on how to enhance the platform's usability and community engagement.",
        },
      ],
    },
    {
      category: "For Artists",
      questions: [
        {
          question: "Is it free to join?",
          answer:
            "Yes, hosting your portfolio will always remain accessible and free. We do, however, aim to offer premium features such as watermarking, extended storage, custom portfolio designs, and advanced analytics for those who wish to enhance their experience.",
        },
        {
          question: "How do I create a profile?",
          answer:
            "Simply sign up on our platform, complete verification steps, and upload your portfolio images or media. Complete your profile with your bio, skills, and location to start showcasing your work. Remember to post your first daily branch post to make yourself even more discoverable on the live explore feeds.",
        },
        {
          question: "What is a Daily Branch Post?",
          answer:
            "A Daily Branch Post is a feature that allows artists to share a single post to the public explore feed, making them discoverable by other artists and the public without showcasing their entire portfolio. It’s a way to branch out and gain visibility while keeping most of their creative work private to their portfolio page.",
        },
        {
          question: "Do I have to create a Daily Branch Post every day?",
          answer:
            "No, posting daily is optional. The feature is designed to give you flexibility and control over how often you want to be visible on the explore feed. We are keeping the explore feed live and without algorithms interrupting your visibility, so posting a daily branch will keep you visible on that day's explore feed.",
        },
        {
          question: "What can I share in a Daily Branch Post?",
          answer:
            "You can choose what to share, whether it’s a single image, a quick update, or a teaser of your work. This allows you to engage your audience without revealing too much of your creative work.",
        },
        {
          question:
            "Will my portfolio still be discoverable without Daily Branch Posts?",
          answer:
            "Your portfolio will always be accessible to those who search for you directly using your unique QR code or find you through location and/or your art forms keyword tags. (To apply search tags, visit your edit profile section.) Daily Branch Posts are an additional tool to help you actively reach new audiences.",
        },
        {
          question: "How secure is my content on the platform?",
          answer:
            "We take security seriously. All portfolios are hosted on secure servers.",
        },
        {
          question: "Can I connect with other artists on the platform?",
          answer:
            "Absolutely! The platform is designed to encourage collaboration by building and showcasing a community full of artists and creatives.",
        },
      ],
    },
  ];

  return (
    <div className="p-6">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {faqs.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="mb-4 text-2xl font-semibold text-gray-700">
              {section.category}
            </h3>
            <div className="space-y-4">
              {section.questions.map((faq, index) => (
                <div
                  key={index}
                  className="cursor-pointer rounded-lg border shadow-sm transition-shadow hover:shadow-md"
                  onClick={() => toggleFAQ(`${sectionIndex}-${index}`)}
                >
                  <div className="flex items-center justify-between p-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {faq.question}
                    </h3>
                    <svg
                      className={`h-6 w-6 transform transition-transform ${
                        activeIndex === `${sectionIndex}-${index}`
                          ? "rotate-180"
                          : ""
                      }`}
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
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeIndex === `${sectionIndex}-${index}`
                        ? "max-h-96"
                        : "max-h-0"
                    }`}
                  >
                    <p className="whitespace-pre-line px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
