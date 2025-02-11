import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";
import { useFetchToken } from "../hooks/useFetchToken";

export const ModalBasic = ({ isOpen, onClose, uid }) => {
  const token = useFetchToken();

  const deleteUser = async () => {
    try {
      await axios.delete(
        `https://sigen.onrender.com/api/enova/users/delete/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Éxito!",
        text: "Usuario eliminado con éxito.",
        icon: "success",
      });
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Error al intentar eliminar el usuario.",
        icon: "error",
      });
    }
  };

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Confirmar Eliminación
        </ModalHeader>
        <ModalBody>
          <p>¿Estás seguro de que deseas eliminar este usuario?</p>
          <div className="flex gap-2">
            <Button color="secondary" onPress={deleteUser}>
              Confirmar
            </Button>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

ModalBasic.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Control de visibilidad del modal
  onClose: PropTypes.func.isRequired, // Función para cerrar el modal
  uid: PropTypes.string.isRequired, // ID del usuario a eliminar
};
