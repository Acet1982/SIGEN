import {
  CalendarCheck,
  DollarSign,
  Hourglass,
  LetterText,
  Shapes,
} from "lucide-react";
import { InputSelect } from "./UI/InputSelect";
import { Input } from "./UI/Input";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ButtonSingle } from "./UI/ButtonSingle";
import Swal from "sweetalert2";
import { useFetchToken } from "../hooks/useFetchToken";
export const FormPayrollEmployee = () => {
  const location = useLocation();
  const pid = location.pathname.split("/")[3];
  const uid = location.pathname.split("/")[5];
  const [userinfo, setUserInfo] = useState({
    username: "",
    lastname: "",
    cc: "",
  });
  const [employeeinfo, setEmployeeInfo] = useState({
    eid: "",
    monthly_salary: "",
  });
  const [days_worked, setDaysWorked] = useState(0);
  const [days_sunday, setDaysSundays] = useState(0);
  const [value_days_sunday, setValueDaysSundays] = useState(0);
  const [sunday_classes, setSundaysClass] = useState(0);
  const [value_sunday_classes, setValueSundaysClass] = useState(0);
  const [instructor_hours, setHoursInstructor] = useState(0);
  const [value_instructor_hours, setValueHourInstructor] = useState(0);
  const [registrations, setRegistrations] = useState(0);
  const [value_registrations, setValueRegistrations] = useState(0);
  const [additional_payments, setAdditional_Payments] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [observations, setObservations] = useState("");
  const [error, setError] = useState("");
  const operation = employeeinfo.monthly_salary / 30;
  const token = useFetchToken();
  const formatToCOP = (value) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  const formatCC = (value) => new Intl.NumberFormat("es-CO").format(value || 0);

  // Obtener la informacion del usuario en cuestión
  useEffect(() => {
    const infoUser = async () => {
      try {
        const response = await axios.get(
          `https://sigen-backend-zebi.onrender.com/api/enova/users/info/${uid}`
        );

        // Verifica si el servidor devolvió un mensaje o error
        const { username, lastname, cc } = response.data.msg;
        setUserInfo({ username, lastname, cc });
      } catch (err) {
        console.error(err);
        setError("Error al obtener la información del usuario.");
      }
    };

    // Llama a la función solo si se proporciona un UID válido
    if (uid) {
      infoUser();
    }
  }, [uid]);

  // Obtener la informacion del empleado
  useEffect(() => {
    const infoEmployee = async () => {
      try {
        const response = await axios.get(
          `https://sigen-backend-zebi.onrender.com/api/enova/employees/${uid}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { eid, monthly_salary } = response.data.msg;
        setEmployeeInfo({ eid, monthly_salary });
      } catch (error) {
        console.error(error);
      }
    };

    if (token) infoEmployee();
  }, [uid, token]);

  // Guardar los detalles de nómina del empleado
  const saveDetailPayrollEmployee = async () => {
    try {
      const response = await axios.post(
        `https://sigen-backend-zebi.onrender.com/api/enova/payrolls/details/${pid}/employee/${employeeinfo.eid}`,
        {
          days_worked,
          days_sunday,
          value_days_sunday,
          sunday_classes,
          value_sunday_classes,
          instructor_hours,
          value_instructor_hours,
          registrations,
          value_registrations,
          additional_payments,
          deductions,
          observations,
        },
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
    } catch (err) {
      console.error(err);
      setError("Error al intentar cargar los detalles de nómina del empleado.");
    }
  };

  {
    /* Totales */
  }
  let [totaldayssundays, setTotalDaysSundays] = useState(0);
  useEffect(() => {
    if (days_sunday && value_days_sunday) {
      setTotalDaysSundays(days_sunday * value_days_sunday);
    }
  }, [days_sunday, value_days_sunday]);

  let [totalsundaysclass, setTotalSundaysClass] = useState(0);
  useEffect(() => {
    if (sunday_classes && value_sunday_classes) {
      setTotalSundaysClass(sunday_classes * value_sunday_classes);
    }
  }, [sunday_classes, value_sunday_classes]);

  let [totalhoursinstructor, setTotalHoursInstructor] = useState(0);
  useEffect(() => {
    if (instructor_hours && value_instructor_hours) {
      setTotalHoursInstructor(instructor_hours * value_instructor_hours);
    }
  }, [instructor_hours, value_instructor_hours]);

  let [totalregistrations, setTotalRegistrations] = useState(0);
  useEffect(() => {
    if (registrations && value_registrations) {
      setTotalRegistrations(registrations * value_registrations);
    }
  }, [registrations, value_registrations]);

  let [basicsalary, setBasicSalary] = useState(0);
  useEffect(() => {
    if (days_worked && operation) {
      setBasicSalary(days_worked * operation);
    }
  }, [days_worked, operation]);

  let [totalpayable, setTotalPayable] = useState(0);
  useEffect(() => {
    if (
      totaldayssundays ||
      totalsundaysclass ||
      totalhoursinstructor ||
      totalregistrations ||
      additional_payments ||
      basicsalary ||
      deductions
    ) {
      setTotalPayable(
        totaldayssundays +
          totalsundaysclass +
          totalhoursinstructor +
          totalregistrations +
          Number(basicsalary) +
          Number(additional_payments) -
          deductions
      );
    }
  }, [
    totaldayssundays,
    totalsundaysclass,
    totalhoursinstructor,
    totalregistrations,
    additional_payments,
    basicsalary,
    deductions,
  ]);

  return (
    <>
      <p className="text-center text-red-500">{error}</p>
      {/* ------- */}
      <form>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 border rounded-lg p-8 shadow-sm">
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <p>Nombre</p>
              <Input value={userinfo.username} />
            </div>
            <div>
              <p>Apellido</p>
              <Input value={userinfo.lastname} />
            </div>
            <div>
              <p>Cédula</p>
              <Input value={formatCC(userinfo.cc)} />
            </div>
            <div>
              <p>Honorario mensual</p>
              <Input value={formatToCOP(employeeinfo.monthly_salary || 0)} />
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p>Días trabajados:</p>
              <InputSelect
                value={days_worked}
                onChange={(e) => setDaysWorked(e.target.value)}
                Icon={CalendarCheck}
              />
            </div>
            <div>
              <p>Dias dominicales</p>
              <InputSelect
                value={Number(days_sunday)}
                onChange={(e) => setDaysSundays(e.target.value)}
                optionOne="Dias dominicales"
                Icon={CalendarCheck}
              />
            </div>
            <div>
              <p>Valor de días dominicales</p>
              <Input
                value={value_days_sunday}
                onChange={(e) => setValueDaysSundays(e.target.value)}
                label="Valor de días dominicales"
                Icon={DollarSign}
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p>Clases dominicales</p>
              <InputSelect
                value={sunday_classes}
                onChange={(e) => setSundaysClass(e.target.value)}
                Icon={Shapes}
              />
            </div>
            <div>
              <p>Valor de clases dominicales</p>
              <Input
                value={value_sunday_classes}
                onChange={(e) => setValueSundaysClass(e.target.value)}
                Icon={DollarSign}
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p>Horas instructor</p>
              <InputSelect
                value={instructor_hours}
                onChange={(e) => setHoursInstructor(e.target.value)}
                Icon={Hourglass}
              />
            </div>
            <div>
              <p>Valor de horas instructor</p>
              <Input
                value={value_instructor_hours}
                onChange={(e) => setValueHourInstructor(e.target.value)}
                Icon={DollarSign}
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p>Total inscripciones</p>
              <InputSelect
                value={registrations}
                onChange={(e) => setRegistrations(e.target.value)}
                Icon={CalendarCheck}
              />
            </div>
            <div>
              <p>Valor de comisión por inscripción</p>
              <Input
                value={value_registrations}
                onChange={(e) => setValueRegistrations(e.target.value)}
                Icon={DollarSign}
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p>Saldos adicionales</p>
              <Input
                value={additional_payments}
                onChange={(e) => setAdditional_Payments(e.target.value)}
                Icon={DollarSign}
              />
            </div>
            <div>
              <p>Deducciones</p>
              <Input
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                Icon={DollarSign}
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-1">
            <div>
              <p>Observaciones</p>
              <Input
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                Icon={LetterText}
              />
            </div>
          </div>
        </div>

        {/* Textos de totales */}
        <div className="mt-4 border rounded-lg p-8 shadow-sm">
          <h3 className="font-semibold text-center mb-4 text-2xl">Totales</h3>
          <div>
            <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p>Saldo total días dominicales</p>
                <Input
                  value={formatToCOP(totaldayssundays)}
                  Icon={CalendarCheck}
                />
              </div>
              <div>
                <p>Saldo total clases dominicales</p>
                <Input
                  value={formatToCOP(totalsundaysclass)}
                  Icon={CalendarCheck}
                />
              </div>

              <div>
                <p>Saldo total horas instructor</p>
                <Input
                  value={formatToCOP(totalhoursinstructor)}
                  Icon={DollarSign}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
              <div>
                <p>Saldo total comisiones por inscripción</p>
                <Input
                  value={formatToCOP(totalregistrations)}
                  Icon={CalendarCheck}
                />
              </div>
              <div>
                <p>Salario base</p>
                <Input value={formatToCOP(basicsalary)} Icon={CalendarCheck} />
              </div>
              <div>
                <p>Total a pagar</p>
                <Input value={formatToCOP(totalpayable)} Icon={CalendarCheck} />
              </div>
            </div>
          </div>
        </div>
        <ButtonSingle
          onClick={saveDetailPayrollEmployee}
          label="Guargar nómina"
          type={"button"}
        />
      </form>
    </>
  );
};
