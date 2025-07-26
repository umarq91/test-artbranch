interface Props {
  name: string;
  setName: any;
  description: string;
  setDescription: any;
}
function PortfolioForm({ name, setName, description, setDescription }: Props) {
  return (
    <div className="flex flex-col gap-2 space-y-2">
      <div className="">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Portfolio Title"
          className="mt-4 w-full rounded-lg border border-gray-300 bg-primary-300 p-2 px-4 text-[20px] text-secondary-200 focus:outline-none"
        />
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-[57px] w-full border border-gray-300 bg-transparent p-[10px_20px] font-syne text-[16px] leading-[19.2px] text-secondary-200 focus:outline-none"
          placeholder="Write what went into this art or add any details you’d like to mention"
        />
      </div>
    </div>
  );
}

export default PortfolioForm;
