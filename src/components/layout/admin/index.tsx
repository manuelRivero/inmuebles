import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import Header from "./header";

interface Props {}

export default function AdminLayout(props: PropsWithChildren<Props>) {
  return (
    <Box>
      <Header />
      <div>{props.children}</div>
    </Box>
  );
}
