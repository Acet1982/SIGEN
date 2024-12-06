import { CardSite } from "../components/UI/CardSite";

export const AllSites = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <CardSite />
      </div>
      <div className="col-span-1">
        <CardSite />
      </div>
    </div>
  );
};
