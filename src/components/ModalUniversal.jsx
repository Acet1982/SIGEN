import { useState } from "react";
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

export const ModalUniversal = () => {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [cc, setCc] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");

  const sizes = ["3xl"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <Button key={size} onPress={() => handleOpen(size)}>
            Open {size}
          </Button>
        ))}
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Registrar Usuario
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-3 ">
                  <InputSingle
                    label="Nombre"
                    placeholder={"Ingrese un nombre"}
                  />
                  <InputSingle
                    label="Apellido"
                    placeholder={"Ingrese un apellido"}
                  />
                  <InputSingle
                    label="Cédula"
                    placeholder={"Ingrese el número de cédula"}
                  />
                  <InputSingle
                    label="Correo"
                    placeholder={"Ingrese un correo electrónico"}
                  />
                  <InputPassword
                    label="Contraseña"
                    placeholder="Crea una contraseña segura"
                  />
                  <InputPassword
                    label="Confirmar contraseña"
                    placeholder="Repita la contraseña"
                  />
                  <ButtonSingle label="Registrar Usuario" />
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
