import { Link } from "react-router-dom";
import { ButtonSingle } from "../components/UI/ButtonSingle";
import { TitlePages } from "./TittlePages";
import { InputFilter } from "./UI/InputFilter";
import { InputSelect } from "./UI/InputSelect";
import {
  MapPinHouse,
  CalendarSearch,
  Calendar1,
  CircleX,
  ChevronDown,
} from "lucide-react";

export const AllPayrolls = () => {
  return (
    <div>
      {/* Título de página */}
      <TitlePages title={"All Payrollss"} />

      {/* Buscador de nóminas por sedes, mes y periodo*/}
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-6">
        <div className="col-span-1">
          <InputSelect
            optionOne={"Sedes"}
            Icon={MapPinHouse}
            colorIcons={"text-purple-600"}
          />
        </div>

        <div className="col-span-1">
          <InputSelect
            optionOne={"Mes"}
            Icon={CalendarSearch}
            colorIcons={"text-purple-600"}
          />
        </div>

        <div className="col-span-1">
          <InputSelect
            optionOne={"Corte"}
            Icon={Calendar1}
            colorIcons={"text-purple-600"}
          />
        </div>

        <div className="flex items-center col-span-1 gap-4 justify-between">
          <div className="w-full">
            <InputFilter placeholder="Filtros" colorIcons={"text-purple-600"} />
          </div>
          <div className="">
            <ButtonSingle type={"submit"} label="Buscar" placeholder="Buscar" />
          </div>
        </div>
      </form>

      {/*Lista de filtros aplicados*/}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <span className="bg-white flex items-center gap-4 py-1 pl-2 pr-6 rounded-full">
          <button className="p-1 rounded-full text-purple-600">
            <CircleX />
          </button>
          Monteria
        </span>

        <span className="bg-white flex items-center gap-4 py-1 pl-2 pr-6 rounded-full">
          <button className="p-1 rounded-full text-purple-600">
            <CircleX />
          </button>
          Noviembre
        </span>

        <span className="bg-white flex items-center gap-4 py-1 pl-2 pr-6 rounded-full">
          <button className="p-1 rounded-full text-purple-600">
            <CircleX />
          </button>
          Corte 1
        </span>

        <button className="text-gray-500 ml-4">Clear All</button>
      </div>

      {/* Resultados */}
      <div className="flex items-center justify-between mb-4">
        <p>Nóminas publicadas!</p>
        <p className="flex items-center gap-2">
          Ordenadas por: <span className="text-purple-600 font-bold">Mes</span>
          <ChevronDown />
        </p>
      </div>

      {/* Tarjetas de nóminas */}
      <Link
        to="/hola"
        className="bg-white rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full drop-shadow-lg cursor-pointer border-2 border-transparent hover:border-purple-400 transition-all mb-4"
      >
        {/* Imagén de nómina */}
        <div className="w-full md:w-[10%] bg-purple-100 rounded-lg flex items-center justify-center">
          <img src="Payroll.svg" className="p-1" alt="IlustrationsPayroll" />
        </div>

        {/* Título e información de nómina */}
        <div className="w-full md:w-[70%]">
          <h1 className="text-xl flex items-center gap-4 mb-2 text-black font-semibold">
            Nómina Sede Sincelejo{" "}
            <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold rounded-md">
              Corte 1
            </span>
            <span className="text-xs py-1 px-2 bg-green-100 text-green-600 font-bold rounded-md">
              Aprovada
            </span>
          </h1>
          <p className="text-gray-500">Por: Nickolas Velazques</p>
        </div>

        {/* Fecha de nómina */}
        <div className="w-full md:w-[20%]">
          <h3 className="text-xl text-gray-500 mb-2">SIGEN 2024</h3>
          <p className="text-gray-500">26 de noviembre</p>
        </div>
      </Link>

      {/* Tarjetas de nóminas */}
      <Link
        to="/hola"
        className="bg-white rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full drop-shadow-lg cursor-pointer border-2 border-transparent hover:border-purple-400 transition-all mb-4"
      >
        {/* Imagén de nómina */}
        <div className="w-full md:w-[10%] bg-purple-100 rounded-lg flex items-center justify-center">
          <img src="Payroll.svg" className="p-1" alt="IlustrationsPayroll" />
        </div>

        {/* Título e información de nómina */}
        <div className="w-full md:w-[70%]">
          <h1 className="text-xl flex items-center gap-4 mb-2 text-black font-semibold">
            Nómina Sede Sincelejo{" "}
            <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold rounded-md">
              Corte 1
            </span>
            <span className="text-xs py-1 px-2 bg-green-100 text-green-600 font-bold rounded-md">
              Aprovada
            </span>
          </h1>
          <p className="text-gray-500">Por: Nickolas Velazques</p>
        </div>

        {/* Fecha de nómina */}
        <div className="w-full md:w-[20%]">
          <h3 className="text-xl text-gray-500 mb-2">SIGEN 2024</h3>
          <p className="text-gray-500">26 de noviembre</p>
        </div>
      </Link>

      {/* Tarjetas de nóminas */}
      <Link
        to="/hola"
        className="bg-white rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full drop-shadow-lg cursor-pointer border-2 border-transparent hover:border-purple-400 transition-all mb-4"
      >
        {/* Imagén de nómina */}
        <div className="w-full md:w-[10%] bg-purple-100 rounded-lg flex items-center justify-center">
          <img src="Payroll.svg" className="p-1" alt="IlustrationsPayroll" />
        </div>

        {/* Título e información de nómina */}
        <div className="w-full md:w-[70%]">
          <h1 className="text-xl flex items-center gap-4 mb-2 text-black font-semibold">
            Nómina Sede Sincelejo{" "}
            <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold rounded-md">
              Corte 1
            </span>
            <span className="text-xs py-1 px-2 bg-green-100 text-green-600 font-bold rounded-md">
              Aprovada
            </span>
          </h1>
          <p className="text-gray-500">Por: Nickolas Velazques</p>
        </div>

        {/* Fecha de nómina */}
        <div className="w-full md:w-[20%]">
          <h3 className="text-xl text-gray-500 mb-2">SIGEN 2024</h3>
          <p className="text-gray-500">26 de noviembre</p>
        </div>
      </Link>
    </div>
  );
};
