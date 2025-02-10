import { DollarSign } from "lucide-react";

export const CardInformation = ({text}) => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h2 className="text-sm font-medium">Total Nómina</h2>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% respecto al mes anterior
          </p>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};
