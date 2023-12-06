import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack
            sx={{width:"100%"}}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box><Typography variant="body1">Aplicación de inmubles</Typography> </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
