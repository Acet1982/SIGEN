import { useEffect, useState } from "react";
import { useFetchToken } from "../hooks/useFetchToken";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { InputSingle } from "./UI/InputSingle";
import { InputPassword } from "./UI/InputPassword";
import { ButtonSingle } from "./UI/ButtonSingle";
import axios from "axios";
import Swal from "sweetalert2";
import { SelectInputClass } from "./UI/SelectInputClass";

export const ModalUpdateUser = ({ uid, isOpen, onClose }) => {
  const token = useFetchToken();
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [cc, setCc] = useState("");
  const [site_id, setSite_Id] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!uid || !token) return;
      try {
        const response = await axios.get(
          `https://sigen-backend-zebi.onrender.com/api/enova/users/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { username, lastname, cc, site_id, email, role_id } =
          response.data;

        setUsername((prev) => username || prev);
        setLastname((prev) => lastname || prev);
        setCc((prev) => cc || prev);
        setSite_Id((prev) => site_id || prev);
        setEmail((prev) => email || prev);
        setProfile({ role_id });
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      }
    };

    fetchUserDetails();
  }, [uid, token]);

  const updateUser = async () => {
    if (profile.role_id === 1 && password !== confpassword) {
      Swal.fire("¡Error!", "Las contraseñas no coinciden.", "error");
      return;
    }

    try {
      const payload = {
        username: username || "",
        lastname: lastname || "",
        cc: cc || "",
        site_id: site_id || "",
        email: profile.role_id === 1 ? email || null : null,
        password: profile.role_id === 1 ? password || null : null,
      };

      await axios.put(
        `https://sigen-backend-zebi.onrender.com/api/enova/users/update/${uid}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("¡Éxito!", "Usuario actualizado con éxito", "success");
      onClose();
    } catch (error) {
      console.error("Error al actualizar datos del usuario:", error);
      Swal.fire(
        "Error",
        error.response?.data?.error || "Error desconocido",
        "error"
      );
    }
  };

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Actualizar Usuario</ModalHeader>
        <ModalBody>
          <InputSingle
            label="Nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputSingle
            label="Apellido"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <InputSingle
            label="Cédula"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
          />
          <SelectInputClass
            value={site_id}
            onChange={(e) => setSite_Id(e.target.value)}
          />
          {profile?.role_id === 1 && (
            <>
              <InputSingle
                label="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputPassword
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputPassword
                label="Confirmar Contraseña"
                value={confpassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonSingle onClick={updateUser} label="Actualizar Empleado" />
          <Button color="danger" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
