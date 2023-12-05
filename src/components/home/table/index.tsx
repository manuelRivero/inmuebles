import { Button, IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import {
  changePropertyStatus,
  deleteProperty,
} from "../../../store/properties/propertiesSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import SweetAlert2 from "react-sweetalert2";

const getColumns = (
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction,
  showDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>
): GridColDef[] => {
  return [
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
    {
      field: "m2",
      sortable: false,
      headerName: "Metros cuadrados",
      width: 200,
    },
    {
      field: "sale",
      headerName: "Gestionar",
      filterable: false,
      editable: false,
      sortable: false,
      hideSortIcons: false,
      disableColumnMenu: true,
      width: 250,
      renderCell: ({ row }) => {
        const { status, id } = row;
        if (status === "DISPONIBLE") {
          const updateStatus = (newStatus: string) => {
            dispatch(changePropertyStatus({ id, status: newStatus }));
          };
          return (
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="info"
                onClick={() => updateStatus("VENDIDA")}
              >
                Vender
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={() => updateStatus("RENTADA")}
              >
                Rentar
              </Button>
            </Stack>
          );
        } else {
          return "No hay aciones disponibles";
        }
      },
    },
    {
      field: "action",
      headerName: "Acciones",
      filterable: false,
      editable: false,
      sortable: false,
      hideSortIcons: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        const { id } = row;
        return (
          <Stack direction="row">
            <IconButton
              type="button"
              onClick={() => {
                setSelectedRow(id);
                showDeleteConfirm(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/detalle-del-inmueble/" + id)}>
              <ModeEditIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
};

export default function DataTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const { properties: data } = useAppSelector(
    (state: RootState) => state.properties
  );
  return (
    <div style={{ height: 400, width: "100%" }}>
      <SweetAlert2
        show={showDeleteConfirm}
        icon="question"
        title="¿Deseas eliminar este inmueble?"
        onConfirm={() =>{ dispatch(deleteProperty({ id: selectedRow })); setSelectedRow(null)}}
        onResolve={()=> setShowDeleteConfirm(false)}
      />
      <DataGrid
        disableRowSelectionOnClick
        rowSelection={false}
        rows={data}
        columns={getColumns(
          dispatch,
          navigate,
          setShowDeleteConfirm,
          setSelectedRow
        )}
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
