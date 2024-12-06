import { TitlePages } from "../components/UI/TittlePages";
import { AllConsolidated } from "../sections/AllConsolidated";
import { Layout } from "./Layout";

export const Consolidated = () => {
  return (
    <Layout>
      <TitlePages title="Consolidated" />
      <AllConsolidated />
    </Layout>
  );
};
