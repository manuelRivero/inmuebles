import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Media, Property } from "../../../types/properties";
interface Props {
  data: Property;
}
export default function Card({ data }: Props) {
  return (
    <Box
      sx={(theme) => ({
        borderRadius: theme.spacing(2),
        padding: theme.spacing(2),
        background: "#fff",
        boxShadow: "10px 10px 20px -15px rgba(0,0,0,0.75)",
        "& > img": {
          borderRadius: theme.spacing(2),
          width: "100%",
        },
      })}
    >
      <img
        src={data.media.find((e: Media) => e.type === "image")?.src}
        alt="imagen de la propiedad"
      />
      <Box sx={(theme) => ({ marginTop: theme.spacing(1) })}>
        <Typography variant="h6" component="h6">
          {data.address}
        </Typography>
        <Stack direction="row" justifyContent="flex-end">
          <Link
            to={`/detalle-del-inmueble/${data.id}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant="body1"
              sx={(theme) => ({
                marginTop: theme.spacing(1),
                color: theme.palette.primary.main,
                borderWidth: 1,
                borderStyle: "solid",
                textDecoration: "none",
                borderColor: "transparent",
                padding: theme.spacing(1),
                borderRadius: theme.spacing(0.5),
                transition: "all .3s",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                },
              })}
            >
              Ver detalles
            </Typography>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
