import { ButtonSingle } from "../UI/ButtonSingle";
import axios from "axios";
import Swal from "sweetalert2";
import { useFetchToken } from "../../hooks/useFetchToken";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AprobatedPayroll = ({ label, endpoind }) => {
  const token = useFetchToken();
  const location = useLocation();
  const pid = location.pathname.split("/")[3];
  const decodedToken = token ? jwtDecode(token) : null;
  const role_id = decodedToken?.role_id;

  if (!token || !role_id) {
    return <div>Loading...</div>;
  }
  const validatedPayroll = async () => {
    console.log(token);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/enova/payrolls/${endpoind}/${pid}`,
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

  const correctpayroll = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/enova/payrolls/correctpayroll/${pid}`,
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
        <button className="text-gray-500 ml-4">Validar Nómina</button>

        <div className="ml-auto">
          {role_id === 5 && (
            <ButtonSingle onClick={validatedPayroll} label={"Validar nómina"} />
          )}
          <ButtonSingle onClick={correctpayroll} label={"Corregir nómina"} />
        </div>
      </div>
    </>
  );
};

AprobatedPayroll.propTypes = {
  label: PropTypes.string.isRequired,
};
