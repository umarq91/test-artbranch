import { Helmet } from "react-helmet";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButtons = ({ title, description, url, image }: any) => {
  return (
    <>
      {/* Dynamically Set Meta Tags */}
      <Helmet>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>

      {/* Share Buttons */}
      <div className="flex space-x-4">
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon size={50} round={true} />
        </FacebookShareButton>

        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={50} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={50} round={true} />
        </WhatsappShareButton>

        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon size={50} round={true} />
        </LinkedinShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
