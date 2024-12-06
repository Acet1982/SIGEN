import { CardInformation } from "../components/CardInformation";
import { TitlePages } from "../components/UI/TittlePages";
import { Layout } from "./Layout";

export const Dashboard = () => {
  return (
    <Layout>
      <TitlePages title="Dashboard" />
      <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1">
          <CardInformation />
        </div>
        <div className="col-span-1">
          <CardInformation />
        </div>
        <div className="col-span-1">
          <CardInformation />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <CardInformation />
        </div>
      </div>
    </Layout>
  );
};
