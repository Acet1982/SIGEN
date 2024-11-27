import { TitlePages } from "./UI/TittlePages";
import { ButtonSingle } from "./UI/ButtonSingle";
import { InputPassword } from "./UI/InputPassword";
import { InputSingle } from "./UI/InputSingle";

export const FormAddUsers = () => {
  return (
    <div className="w-[450px] m-auto border-1 p-4 rounded-2xl text-center">
      <TitlePages title="Registrar usuario" />
      <form className="flex flex-col gap-3 ">
        <InputSingle label="Nombre" placeholder={"Ingrese un nombre"} />
        <InputSingle label="Apellido" placeholder={"Ingrese un apellido"} />
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
    </div>
  );
};
