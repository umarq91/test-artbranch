type Props = {
  title: string;
  description: string;
};

function NoFound({ title, description }: Props) {
  return (
    <div className="mt-20 flex h-[200px] w-full flex-col items-center justify-center text-center font-poppins text-gray-500">
      <svg
        className="mb-4 h-12 w-12 text-gray-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm text-gray-400">{description}</p>
    </div>
  );
}

export default NoFound;
