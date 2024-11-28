import { useState } from "react";
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

export const ModalUniversal = () => {
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

  const handleOpen = () => {
    setSize("3xl");
    onOpen();
  };

  const registerUsers = async () => {
    try {
      if (!token) return;

      await axios.post(
        "http://localhost:5000/api/enova/users/register",
        {
          username,
          lastname,
          cc,
          site_id,
          email,
          password,
          confpassword,
        },
        {
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
                  <ButtonSingle
                    onClick={registerUsers}
                    label="Registrar Usuario"
                    type="submit"
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
