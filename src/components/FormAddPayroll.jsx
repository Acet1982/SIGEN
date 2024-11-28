import { MapPinHouse } from "lucide-react";
import { InputSelect } from "./UI/InputSelect";

export const FormAddPayroll = () => {
  return (
    <div>
      <InputSelect Icon={MapPinHouse} optionOne={"Seleccione una sede"} />
    </div>
  );
};
