import { FormPayrollEmployee } from "../components/FormPayrollEmployee.jsx";
import { Layout } from "../pages/Layout.jsx";

export const AddPayrollDetail = () => {
  return (
    <Layout>
      <div>Cargar nómina de empleados</div>
      <FormPayrollEmployee />
    </Layout>
  );
};
