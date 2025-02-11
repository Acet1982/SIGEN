import { CircleX } from "lucide-react";
import { ButtonSingle } from "../components/UI/ButtonSingle";
import axios from "axios";
import Swal from "sweetalert2";
import { useFetchToken } from "../hooks/useFetchToken";

export const FilterApplied = () => {
  const token = useFetchToken();

  const createPayroll = async () => {
    console.log(token)
    try {
      const response = await axios.post(
        `https://sigen.onrender.com/api/enova/payrolls/create`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Exito!",
        text: response.data.msg,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Ups!",
        text: error.response.data.error,
        icon: "error",
      });
    }
  };

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

        <div className="ml-auto">
          <ButtonSingle onClick={createPayroll} label="Crear Nómina" />
        </div>
      </div>
    </>
  );
};
