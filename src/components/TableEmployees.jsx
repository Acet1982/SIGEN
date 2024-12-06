import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFetchToken } from "../hooks/useFetchToken.jsx";
import { fetchData } from "../hooks/fetchData.jsx";
import { ModalBasic } from "./ModalBasic.jsx";
import { ModalUpdateUser } from "./ModalUpdateUser.jsx";
import { EditIcon } from "./UI/Icons/EditIcon";
import { DeleteIcon } from "./UI/Icons/DeleteIcon.jsx";
import { FilePlus, MoreVertical, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";

const URL_USERS = "http://localhost:5000/api/enova/users/";

export const TableEmployees = ({ enpoint }) => {
  const token = useFetchToken();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUid, setSelectedUid] = useState(null);

  const [profile, setProfile] = useState([]);
  const location = useLocation();
  const pid = location.pathname.split("/")[3];
  const vist = location.pathname.split("/")[1];
  const vistp = location.pathname.split("/")[2];
  const formatCC = (value) => new Intl.NumberFormat("es-CO").format(value || 0);

  // Función para cargar el perfil del usuario
  useEffect(() => {
    const Profile = async () => {
      if (!token) return;
      try {
        const response = await axios.get(
          "http://localhost:5000/api/enova/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.log(error.response?.data?.error || error.message);
      }
    };
    Profile();
  }, [token]);

  const handleOpenEditModal = (uid) => {
    setSelectedUid(uid);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUid(null);
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteModal = (uid) => {
    setSelectedUid(uid);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedUid(null);
    setIsDeleteModalOpen(false);
  };

  const updateRoleAdmin = async (to, uid) => {
    try {
      const userUpdated = await axios.put(
        `http://localhost:5000/api/enova/users/update-role-${to}/${uid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Exito",
        text: userUpdated.data.msg,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: error.userUpdated.data.error,
        icon: "error",
      });
    }
  };

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
          <TableColumn>CÉDULA</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>

        <TableBody>
          {data.msg?.map((user) => (
            <TableRow key={user.uid}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{formatCC(user.cc)}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  {profile.role_id === 1 && (
                    <>
                      <Dropdown>
                        <DropdownTrigger>
                          <MoreVertical size={20} />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Cambiar rol">
                          <DropdownItem
                            key="copy"
                            onClick={() =>
                              updateRoleAdmin("administrator", user.uid)
                            }
                          >
                            Administrador
                          </DropdownItem>
                          <DropdownItem
                            key="copy"
                            onClick={() =>
                              updateRoleAdmin("coordinator", user.uid)
                            }
                          >
                            Coordinador
                          </DropdownItem>
                          <DropdownItem
                            key="copy"
                            onClick={() =>
                              updateRoleAdmin("internal-control", user.uid)
                            }
                          >
                            Control interno
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </>
                  )}
                  {profile.role_id === 2 && (
                    <>
                      {vist !== "employees" && (
                        <>
                          <Tooltip content="Cargar nómina">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <Link
                                to={`/payrolls/details/${pid}/employee/${user.uid}`}
                              >
                                <FilePlus size={"20px"} />
                              </Link>
                            </span>
                          </Tooltip>
                        </>
                      )}
                    </>
                  )}
                  {vistp !== "details" && (
                    <>
                      <Tooltip content="Información del empleado">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <Link to={`/add-Info/${user.uid}`}>
                            <UserPlus size={"20px"} />
                          </Link>
                        </span>
                      </Tooltip>
                      <Tooltip content="Editar usuario">
                        <span
                          className="cursor-pointer"
                          onClick={() => handleOpenEditModal(user.uid)}
                        >
                          <EditIcon />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Eliminar usuario">
                        <span
                          onClick={() => handleOpenDeleteModal(user.uid)}
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                        >
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal para editar usuario */}
      {isEditModalOpen && (
        <ModalUpdateUser
          uid={selectedUid}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
        />
      )}

      {/* Modal para confirmar eliminación */}
      {isDeleteModalOpen && (
        <ModalBasic
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          uid={selectedUid}
        />
      )}
    </div>
  );
};

TableEmployees.propTypes = {
  enpoint: PropTypes.string.isRequired,
};
