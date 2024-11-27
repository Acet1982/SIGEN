import { Link } from "react-router-dom";


export const CardPayroll = () => {
  return (
    <>
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
    </>
  );
}
