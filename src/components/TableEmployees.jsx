import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFetchToken } from "../hooks/useFetchToken.jsx";
import { fetchData } from "../hooks/fetchData.jsx";
import { ModalBasic } from "./ModalBasic.jsx";
import { EditIcon } from "./UI/Icons/EditIcon";
import { DeleteIcon } from "./UI/Icons/DeleteIcon.jsx";
import { UserPen } from "lucide-react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUid, setSelectedUid] = useState(null);

  const handleOpenModal = (uid) => {
    setSelectedUid(uid);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUid(null);
    setIsModalOpen(false);
  };

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
      {/* Tabla de usuarios */}
      <Table
        color="secondary"
        selectionMode="single"
        defaultSelectedKeys={["0"]}
        aria-label="Tabla de empleados"
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
                  <Tooltip content="Cambiar rol">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <UserPen size={"20px"} />
                    </span>
                  </Tooltip>
                  <Tooltip content="Editar usuario">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar usuario">
                    <span
                      onClick={() => handleOpenModal(user.uid)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal para confirmar eliminación */}
      {isModalOpen && (
        <ModalBasic
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          uid={selectedUid}
        />
      )}
    </div>
  );
};

TableEmployees.propTypes = {
  enpoint: PropTypes.string.isRequired,
};
