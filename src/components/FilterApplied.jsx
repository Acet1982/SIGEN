import { CircleX } from "lucide-react";

export const FilterApplied = () => {
  return (
    <>
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <span className="bg-white flex items-center gap-4 py-1 pl-2 pr-6 rounded-full">
          <button className="p-1 rounded-full text-purple-600">
            <CircleX size={"18px"} />
          </button>
          Monteria
        </span>

        <span className="bg-white flex items-center gap-4 py-1 pl-2 pr-6 rounded-full">
          <button className="p-1 rounded-full text-purple-600">
            <CircleX size={"18px"} />
          </button>
          Noviembre
        </span>

        <span className="bg-white flex items-center gap-4 py-1 pl-2 pr-6 rounded-full">
          <button className="p-1 rounded-full text-purple-600">
            <CircleX size={"18px"} />
          </button>
          Corte 1
        </span>

        <button className="text-gray-500 ml-4">Clear All</button>
      </div>
    </>
  );
};
