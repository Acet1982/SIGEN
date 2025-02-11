import { useState, useEffect } from "react";
import { fetchData } from "../hooks/fetchData.jsx";
import { Loader } from "../components/UI/Loader.jsx";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { useFetchToken } from "../hooks/useFetchToken.jsx";
import { DeleteIcon } from "../components/UI/Icons/DeleteIcon";
import { ButtonSingle } from "../components/UI/ButtonSingle.jsx";
import axios from "axios";

const URL_SITES = "https://sigen.onrender.com/api/enova/sites";

export const Sites = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sitename, setSiteName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const token = useFetchToken();

  // Cargar datos de la API
  useEffect(() => {
    if (!token) return;

    const loadSites = async () => {
      try {
        const result = await fetchData(URL_SITES, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(result.msg || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSites();
  }, [token, refresh]);

  const createSite = async () => {
    await axios.post(
      "https://sigen.onrender.com/api/enova/sites/create",
      { sitename },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const deleteSite = async (sid) => {
    await axios.delete(
      `https://sigen.onrender.com/api/enova/sites/delete/${sid}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Tabla de sedes */}
      <div className="w-full md:w-2/3">
        <Table
          color="secondary"
          selectionMode="none"
          aria-label="Tabla de sedes"
        >
          <TableHeader>
            <TableColumn>NOMBRE DE LA SEDE</TableColumn>
            <TableColumn>ACCIONES</TableColumn>
          </TableHeader>

          <TableBody>
            {data.map((site) => (
              <TableRow key={site.sid}>
                <TableCell>{site.sitename}</TableCell>
                <TableCell>
                  <Tooltip color="danger" content="Eliminar">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => deleteSite(site.sid)}
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Formulario para agregar nueva sede */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Agregar nueva sede</h3>
        <Input
          label="Nombre de la sede"
          placeholder="Ingrese el nombre de la nueva sede"
          value={sitename}
          onChange={(e) => setSiteName(e.target.value)}
        />
        <ButtonSingle
          color="primary"
          onClick={createSite}
          className="self-start"
          label="Agregar Sede"
        ></ButtonSingle>
      </div>
    </div>
  );
};
