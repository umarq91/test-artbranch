import PageMeta from "Components/PageMeta";
import Tabs from "./Tabs";

const AcknowledgementPage = () => {
  return (
    <>
      <PageMeta
        title="Acknowledgment"
        description="A heartfelt acknowledgment of the artists, creators, and supporters who make Artbranch a thriving creative community."
      />

      <Tabs />
      <div className="m-4 mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-8 p-8 font-poppins">
        {/* <div className="rounded-lg border-gray-300 p-8 text-center">
          <h1 className="mb-4 text-3xl font-semibold text-gray-800">
            Acknowledgement of Country
          </h1>
          <p className="mb-4 text-lg leading-10">
            Art Branch respectfully acknowledges the Traditional Custodians of
            the lands on which we live, create, and connect. We pay our deepest
            respects to Aboriginal and Torres Strait Islander peoples, the
            original artists, storytellers, and knowledge keepers of this land.
          </p>
          <p className="mb-4 text-lg leading-10">
            We recognise their enduring connection to Country, their rich
            artistic traditions, and the ways in which their creativity
            continues to inspire and shape Australian culture.
          </p>
          <p className="mb-4 text-lg leading-10">
            At Art Branch, we are committed to honouring, celebrating, and
            amplifying First Nations voices. We strive to foster a space where
            all artists are valued and where Indigenous cultural heritage is
            recognised, respected, and preserved.
          </p>
          <p className="text-lg leading-10">
            As we support and celebrate artistic expression, we stand in
            solidarity with First Nations artists and communities, ensuring that
            their stories and contributions remain at the heart of Australia’s
            creative landscape.
          </p>
        </div> */}
        <div>
          <img
            src="/artbranch.png"
            className="h-auto w-auto object-cover"
            alt="Art Branch"
          />
        </div>
      </div>
    </>
  );
};

export default AcknowledgementPage;
