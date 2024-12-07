import { useState, useEffect } from "react";
import { fetchData } from "../hooks/fetchData.jsx";
import { EditIcon } from "./UI/Icons/EditIcon";
import { DeleteIcon } from "./UI/Icons/DeleteIcon";
import { Loader } from "../components/UI/Loader.jsx";
import PropTypes from "prop-types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";

const URL_USERS = "https://sigen-backend-zebi.onrender.com/api/enova/users/";

export const TableUsers = ({ enpoint, token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const loadUsers = async () => {
      try {
        const result = await fetchData(`${URL_USERS}${enpoint}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [token, enpoint]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <Table
        color="secondary"
        selectionMode="single"
        defaultSelectedKeys={["0"]}
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>APELLIDO</TableColumn>
          <TableColumn>CORREO</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>

        <TableBody>
          {data.msg?.map((user) => (
            <TableRow key={user.uid}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar usuario">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar usuario">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

TableUsers.propTypes = {
  enpoint: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired, // Nueva prop para el token
};
