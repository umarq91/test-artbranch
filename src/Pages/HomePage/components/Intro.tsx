import Button from "Components/Button";
import { useNavigate } from "react-router-dom";

export default function Introduction() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-center">
      <p className="inline-block rounded-full bg-[#7e9b97] px-5 py-2 text-sm font-semibold text-white">
        Australian Artist Directory
      </p>

      <h1 className="font-syne text-2xl font-bold leading-tight text-[#131114] sm:text-4xl md:text-5xl lg:text-6xl">
        Explore. Locate. Engage. Collaborate.
      </h1>

      <div className="mt-4 flex justify-center">
        <Button onClick={() => navigate("/login")} title="Explore" />
      </div>

      <p className="mx-auto max-w-4xl text-base leading-relaxed text-gray-700 opacity-70 sm:text-lg">
        Welcome to Art Branch – the ultimate platform that bridges the gap
        between artists and their communities across Australia. Discover,
        connect, and collaborate effortlessly with Australian artists.
      </p>
    </div>
  );
}
