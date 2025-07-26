import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title?: string;
  description?: string;
}

const PageMeta = ({
  title = "Art Branch",
  description = "Poker",
}: PageMetaProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </>
  );
};

export default PageMeta;
