import { ChevronDown } from "lucide-react";

export const DescriptionPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p>Nóminas publicadas!</p>
        <p className="flex items-center gap-2">
          Ordenadas por: <span className="text-purple-600 font-bold">Mes</span>
          <ChevronDown />
        </p>
      </div>
    </>
  );
}
