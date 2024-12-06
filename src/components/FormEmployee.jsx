import { Input } from "./UI/Input";

export const FormEmployee = () => {
  return (
    <div className="gap-4">
      <div className="flex gap-4 mb-4">
        <Input placeholder={"Nombre"} />
        <Input placeholder={"Apellido"} />
        <Input placeholder={"Cédula"} />
      </div>
      <div className="flex gap-4">
        <Input placeholder={"Días trabajados"} />
        <Input placeholder={"Días dominicales"} />
        <Input placeholder={"Valor de días dominicales"} />
      </div>
      <div className="flex gap-4">
        <Input placeholder={"Clases dominicales"} />
        <Input placeholder={"Valor de clases dominicales"} />
        <Input placeholder={"Horas de instructor"} />
        <Input placeholder={"Valor de horas de instructor"} />
      </div>
      <div className="flex gap-4">
        <Input placeholder={"Inscripciones"} />
        <Input placeholder={"Valor de inscripciones"} />
        <Input placeholder={"Horas de instructor"} />
        <Input placeholder={"Valor de horas de instructor"} />
      </div>
    </div>
  );
};
