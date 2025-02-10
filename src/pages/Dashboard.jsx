import { TopEmployees } from "../components/TopEmployees";
import { CardInformation } from "../components/CardInformation";
import { TitlePages } from "../components/UI/TittlePages";
import { Layout } from "./Layout";
import { ComparativeCard } from "../components/ComparativeCard";
import { CardConsolidated } from "../components/CardConsolidated";

export const Dashboard = () => {
  return (
    <Layout>
      <TitlePages title="Dashboard" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Primera columna: CardConsolidated y CardInformation */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2 md:grid-cols-2">
          <div>
            <CardConsolidated endpoint="/details" />
          </div>
          <div>
            <CardInformation />
          </div>
          {/* Segunda fila: ComparativeCard con ancho de 2 columnas en pantallas grandes */}
          <div className="md:col-span-2">
            <ComparativeCard endpoint="/details" />
          </div>
        </div>

        {/* Columna derecha: TopEmployees */}
        <div>
          <TopEmployees />
        </div>
      </div>
    </Layout>
  );
};
