import DataTable from "react-data-table-component";

export const TableUsers = () => {
  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Apellido",
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      name: "Número de documento",
      selector: (row) => row.cc,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
    },
  ];

  const data = [
    {
      username: "Alejandro",
      lastname: "Ber.",
      cc: "1005710134",
      email: "Alejandro@developer.com",
    },
    {
      username: "Wadys",
      lastname: "Cure",
      cc: "1005710134",
      email: "Wadys@user_1.com",
    },
    {
      username: "Erika",
      lastname: "Martinez",
      cc: "1005710134",
      email: "Erika@user_2.com",
    },
    {
      username: "Obed",
      lastname: "Ortega",
      cc: "1005710134",
      email: "Obed@user_3.com",
    },
  ];
  return (
    <div className="w-[680px]">
      <DataTable columns={columns} data={data} fixedHeader />
    </div>
  );
};
