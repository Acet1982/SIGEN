import { useState, useEffect } from "react";
import { useFetchToken } from "../hooks/useFetchToken.jsx";
import { fetchData } from "../hooks/fetchData.jsx";
import { EditIcon } from "./UI/Icons/EditIcon";
import { DeleteIcon } from "./UI/Icons/DeleteIcon";
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

const URL_USERS = "http://localhost:5000/api/enova/users/";

export const TableEmployees = ({ enpoint }) => {
  const token = useFetchToken();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    const loadUsers = async () => {
      try {
        const result = await fetchData(`${URL_USERS}${enpoint}`, {
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex flex-col gap-3">
      <Table
        color="warning"
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
                  <Tooltip content="Edit user">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete user">
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

TableEmployees.propTypes = {
  enpoint: PropTypes.string.isRequired,
};