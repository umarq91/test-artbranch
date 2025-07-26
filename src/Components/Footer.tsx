import { FaInstagram } from "react-icons/fa"; 
import Logo from "../assets/newLogo.png";
import FeedBackForm from "./FeedBackForm";

const Footer = () => {
  const currentYear = new Date();
  return (
    <footer className="rounded-3xl bg-[rgb(207,200,184)] py-12">
      <FeedBackForm />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="flex flex-col items-center lg:col-span-4 lg:items-start">
            <img src={Logo} alt="Art Branch Logo" className="mb-6 h-48 w-48" />
          </div>

          <div className="grid grid-cols-2 gap-8 py-4 sm:grid-cols-3 md:py-10 lg:col-span-8">
            <div className="flex flex-col">
              <h4 className="mb-4 text-xl font-semibold">Who are we?</h4>
              <a href="/about-us" className="footer-link mb-2">
                About us
              </a>
              <a href="/about-us#howitworks" className="footer-link mb-2">
                How it works
              </a>
              <a href="/about-us#faqs" className="footer-link mb-2">
                FAQs
              </a>
              {/* <a href="/termsconditions" className="footer-link mb-2">
                Terms & Conditions
              </a> */}
              <a href="/acknowledgement" className="footer-link mb-2">
                Acknowledgment of land & country
              </a>
              <a
                href="https://www.instagram.com/artbranch.au"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <FaInstagram size={20} /> Instagram
              </a>
            </div>

            {/* Who Are We Section */}
            <div className="flex flex-col gap-2">
              <h4 className="mb-4 text-xl font-semibold">LEGALS</h4>
              <a href="/termsconditions" className="footer-link mb-2">
                Terms & Conditions
              </a>
              <a href="/privacypolicy" className="footer-link mb-2">
                Privacy & Policy
              </a>

              <a href="/cod" className="footer-link mb-2">
                Code of Conduct
              </a>
            </div>

            {/* Events Section */}
            <div className="col-span-2 flex flex-col sm:col-span-1">
              <h4 className="mb-4 text-xl font-semibold">Quick Links</h4>
              <a href="/search" className="footer-link mb-2">
                Search
              </a>
              <a href="/signup" className="footer-link mb-2">
                Join Art Branch
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-300 pt-4 text-center lg:flex-row lg:text-left">
          <span className="text-base font-normal text-[#131114]">
            © {currentYear.getFullYear()}, Art Branch
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
