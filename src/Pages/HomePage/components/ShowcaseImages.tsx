import Rectangle26 from "../../../assets/Rectangle26.jpg";
import Rectangle27 from "../../../assets/Rectangle27.jpg";
import Rectangle28 from "../../../assets/Rectangle28.jpg";
import Rectangle29 from "../../../assets/Rectangle29.jpg";
import Rectangle30 from "../../../assets/Rectangle30.jpg";
import Rectangle31 from "../../../assets/Rectangle31.jpg";

export default function ShowcaseImages() {
  return (
    <div className="relative overflow-hidden px-4 md:px-10">
      <div className="no-scrollbar relative mt-0 flex h-[402px] w-full overflow-x-auto overflow-y-hidden p-3">
        <div className="flex space-x-7">
          <div className="relative h-[402px] w-[278px] overflow-hidden rounded-[20px] bg-[#D9D9D9]">
            <img
              src={Rectangle26}
              alt="Rectangle26"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative h-[402px] w-[278px] overflow-hidden rounded-[20px] bg-[#D9D9D9]">
            <img
              src={Rectangle27}
              alt="Rectangle27"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative h-[402px] w-[278px] overflow-hidden rounded-[20px] bg-[#D9D9D9]">
            <img
              src={Rectangle28}
              alt="Rectangle28"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative h-[402px] w-[278px] overflow-hidden rounded-[20px] bg-[#D9D9D9]">
            <img
              src={Rectangle29}
              alt="Rectangle29"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative h-[402px] w-[278px] overflow-hidden rounded-[20px] bg-[#D9D9D9]">
            <img
              src={Rectangle30}
              alt="Rectangle30"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative h-[402px] w-[278px] overflow-hidden rounded-[20px] bg-[#D9D9D9]">
            <img
              src={Rectangle31}
              alt="Rectangle31"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
