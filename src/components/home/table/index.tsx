import { IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState, useAppSelector } from "../../../store/store";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "address", headerName: "Dirección", width: 200 },
  { field: "salePrice", headerName: "Precio de venta", width: 200 },
  {
    field: "rentPrice",
    headerName: "Precio de renta",
    width: 200,
  },
  {
    field: "status",
    headerName: "Estatus",
    sortable: false,
    width: 200,
  },
  { field: "m2", sortable: false, headerName: "Metros cuadrados", width: 200 },
  {
    field: "action",
    headerName: "Acciones",
    filterable: false,
    editable: false,
    sortable: false,
    hideSortIcons: false,
    disableColumnMenu: true,
    renderCell: () => {
      return (
        <Stack direction="row">
          <IconButton>
            <DeleteIcon />
          </IconButton>{" "}
          <IconButton>
            <ModeEditIcon />
          </IconButton>
        </Stack>
      );
    },
  },
];

export default function DataTable() {
  const { properties: data } = useAppSelector(
    (state: RootState) => state.properties
  );
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
