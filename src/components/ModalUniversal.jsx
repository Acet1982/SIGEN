import { useEffect, useState } from "react";
import { useFetchToken } from "../hooks/useFetchToken";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { InputSingle } from "./UI/InputSingle";
import { InputPassword } from "./UI/InputPassword";
import { ButtonSingle } from "./UI/ButtonSingle";
import axios from "axios";
import Swal from "sweetalert2";
import { SelectInputClass } from "./UI/SelectInputClass";
import { useNavigate } from "react-router-dom";

export const ModalUniversal = () => {
  const navigate = useNavigate();
  const token = useFetchToken();
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [cc, setCc] = useState("");
  const [site_id, setSite_Id] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");
  const [profile, setProfile] = useState([]);

  const handleOpen = () => {
    setSize("3xl");
    onOpen();
  };

  // Función para cargar el perfil del usuario
  useEffect(() => {
    const Profile = async () => {
      if (!token) return;
      try {
        const response = await axios.get(
          "https://sigen.onrender.com/api/enova/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
    Profile();
  }, [token]);

  const registerUsers = async () => {
    if (profile.role_id === 1 && password !== confpassword) {
      Swal.fire({
        title: "¡Error!",
        text: "Las contraseñas no coinciden.",
        icon: "error",
      });
      return;
    }

    try {
      if (!token) return;

      await axios.post(
        "https://sigen.onrender.com/api/enova/users/register",
        {
          username,
          lastname,
          cc,
          site_id,
          email: profile.role_id === 1 ? email : null,
          password: profile.role_id === 1 ? password : null,
          confpassword,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "¡Éxito!",
        text: "Usuario registrado con éxito!",
        icon: "success",
      });
      navigate("/employees");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Error",
          text: error.response.data.error,
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button color="secondary" key={size} onPress={() => handleOpen("3xl")}>
          Registrar Usuario
        </Button>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Registrar Usuario
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-3">
                  <InputSingle
                    label="Nombre"
                    placeholder={"Ingrese un nombre"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <InputSingle
                    label="Apellido"
                    placeholder={"Ingrese un apellido"}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <InputSingle
                    label="Cédula"
                    placeholder={"Ingrese el número de cédula"}
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                  />
                  <SelectInputClass
                    value={site_id}
                    onChange={(e) => setSite_Id(e.target.value)}
                  />
                  {profile.role_id === 1 && (
                    <>
                      <InputSingle
                        label="Correo"
                        placeholder={"Ingrese un correo electrónico"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <InputPassword
                        label="Contraseña"
                        placeholder="Crea una contraseña segura"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputPassword
                        label="Confirmar contraseña"
                        placeholder="Repita la contraseña"
                        value={confpassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                      />
                    </>
                  )}
                  <ButtonSingle
                    onClick={registerUsers}
                    label="Registrar Usuario"
                    type="button"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
