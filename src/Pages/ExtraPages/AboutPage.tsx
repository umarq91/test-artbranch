import About from "Components/About";
import FAQSection from "Components/FAQ";
import HowThisWorks from "Components/HowThisWorks";
import PageMeta from "Components/PageMeta";
import Tabs from "./Tabs";

function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Artbranch – Empowering Creativity & Artists"
        description="Learn more about Artbranch, a platform dedicated to connecting artists, showcasing creativity, and building a vibrant creative community."
      />

      <Tabs />

      <div className="m-4 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-8 bg-white p-8 font-poppins">
        <section id="about" className="mb-5">
          <About />
        </section>
        <section id="howthisworks">
          <HowThisWorks />
        </section>
        <section id="faqs">
          <FAQSection />
        </section>
      </div>
    </>
  );
}

export default AboutPage;
