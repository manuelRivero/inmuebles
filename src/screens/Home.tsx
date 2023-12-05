import HomeTable from "../components/home/table";
import { Typography, Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Typography
        sx={(theme) => ({ marginTop: theme.spacing(4) })}
        variant="h2"
        component="h1"
        align="center"
      >
        Listado de propiedades
      </Typography>
      <Container>
        <HomeTable />
      </Container>
    </>
  );
}
