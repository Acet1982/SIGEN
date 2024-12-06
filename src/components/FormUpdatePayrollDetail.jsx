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

export const FormUpdatePayrollDetail = () => {
  const location = useLocation();
  const pdid = location.pathname.split("/")[4];

  const [userinfo, setUserInfo] = useState({
    username: "",
    lastname: "",
    cc: "",
  });
  const [employeeinfo, setEmployeeInfo] = useState({
    eid: "",
    monthly_salary: 0,
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

  const token = useFetchToken();

  const formatToCOP = (value) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);

  const formatCC = (value) => new Intl.NumberFormat("es-CO").format(value || 0);

  // Obtener la información del usuario
  useEffect(() => {
    const infoUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/enova/payrolls/details/employee/${pdid}`
        );

        const data = response.data.msg;
        setUserInfo({
          username: data.user_name,
          lastname: data.last_name,
          cc: data.cc,
        });
        setEmployeeInfo({
          eid: data.eid,
          monthly_salary: data.monthly_salary,
        });
        setDaysWorked(data.days_worked || 0);
        setDaysSundays(data.days_sunday || 0);
        setValueDaysSundays(data.value_days_sunday || 0);
        setSundaysClass(data.sunday_classes || 0);
        setValueSundaysClass(data.value_sunday_classes || 0);
        setHoursInstructor(data.instructor_hours || 0);
        setValueHourInstructor(data.value_instructor_hours || 0);
        setRegistrations(data.registrations || 0);
        setValueRegistrations(data.value_registrations || 0);
        setAdditional_Payments(data.additional_payments || 0);
        setDeductions(data.deductions || 0);
        setObservations(data.observations || "");
      } catch (err) {
        console.error(err);
        setError("Error al obtener la información del usuario.");
      }
    };

    if (pdid) {
      infoUser();
    }
  }, [pdid]);

  // Cálculos dinámicos
  const basic_salary = (employeeinfo.monthly_salary / 30) * days_worked;
  const total_days_sundays = days_sunday * value_days_sunday;
  const total_sundays_classes = sunday_classes * value_sunday_classes;
  const total_instructor_hours = instructor_hours * value_instructor_hours;
  const total_registrations = registrations * value_registrations;
  const total_payable =
    Number(basic_salary) +
    Number(total_days_sundays) +
    Number(total_sundays_classes) +
    Number(total_instructor_hours) +
    Number(total_registrations) +
    Number(additional_payments) -
    Number(deductions);

  // Guardar los detalles de nómina del empleado
  const saveDetailPayrollEmployee = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/enova/payrolls/details/update/${pdid}`,
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
        title: "Éxito!",
        text: response.data.msg,
        icon: "success",
      });
    } catch (err) {
      console.error(err);
      setError("Error al intentar cargar los detalles de nómina del empleado.");
    }
  };

  return (
    <>
      <p className="text-center text-red-500">{error}</p>
      <form>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 border rounded-lg p-8 shadow-sm">
          {/* Información Básica */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <p>Nombre</p>
              <Input
                value={userinfo.username}
                onChange={(e) =>
                  setUserInfo({ ...userinfo, username: e.target.value })
                }
              />
            </div>
            <div>
              <p>Apellido</p>
              <Input
                value={userinfo.lastname}
                onChange={(e) =>
                  setUserInfo({ ...userinfo, lastname: e.target.value })
                }
              />
            </div>
            <div>
              <p>Cédula</p>
              <Input
                value={formatCC(userinfo.cc)}
                onChange={(e) =>
                  setUserInfo({ ...userinfo, cc: e.target.value })
                }
              />
            </div>
            <div>
              <p>Honorario mensual</p>
              <Input
                value={formatToCOP(employeeinfo.monthly_salary)}
                onChange={(e) =>
                  setEmployeeInfo({
                    ...employeeinfo,
                    monthly_salary: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* Días y Valores */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p>Días trabajados</p>
              <InputSelect
                value={days_worked}
                onChange={(e) => setDaysWorked(Number(e.target.value))}
                Icon={CalendarCheck}
              />
            </div>
            <div>
              <p>Días dominicales</p>
              <InputSelect
                value={days_sunday}
                onChange={(e) => setDaysSundays(Number(e.target.value))}
                Icon={CalendarCheck}
              />
            </div>
            <div>
              <p>Valor de días dominicales</p>
              <Input
                value={value_days_sunday}
                onChange={(e) => setValueDaysSundays(Number(e.target.value))}
                Icon={DollarSign}
              />
            </div>
          </div>

          {/* Clases dominicales */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p>Clases dominicales</p>
              <InputSelect
                value={sunday_classes}
                onChange={(e) => setSundaysClass(Number(e.target.value))}
                Icon={Shapes}
              />
            </div>
            <div>
              <p>Valor de clases dominicales</p>
              <Input
                value={value_sunday_classes}
                onChange={(e) => setValueSundaysClass(Number(e.target.value))}
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

        {/* Totales */}
        <div className="mt-4 border rounded-lg p-8 shadow-sm">
          <h3 className="font-semibold text-center mb-4 text-2xl">Totales</h3>
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p>Saldo total días dominicales</p>
              <Input
                value={formatToCOP(total_days_sundays)}
                Icon={CalendarCheck}
              />
            </div>
            <div>
              <p>Saldo total clases dominicales</p>
              <Input value={formatToCOP(total_sundays_classes)} Icon={Shapes} />
            </div>
            <div>
              <p>Saldo total horas instructor</p>
              <Input
                value={formatToCOP(total_instructor_hours)}
                Icon={Hourglass}
              />
            </div>
            <div>
              <p>Saldo total comisiones por inscripción</p>
              <Input
                value={formatToCOP(total_registrations)}
                Icon={DollarSign}
              />
            </div>
            <div>
              <p>Salario base</p>
              <Input value={formatToCOP(basic_salary)} Icon={DollarSign} />
            </div>
            <div>
              <p>Total a pagar</p>
              <Input value={formatToCOP(total_payable)} Icon={DollarSign} />
            </div>
          </div>
        </div>

        {/* Botón */}
        <ButtonSingle
          onClick={saveDetailPayrollEmployee}
          label="Actualizar Nómina"
          type={"button"}
        />
      </form>
    </>
  );
};
