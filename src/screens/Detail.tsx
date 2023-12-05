import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property } from "../types/properties";
import { data } from "../data/properties";
import { Box, CircularProgress } from "@mui/material";

export default function Detail() {
  const { id } = useParams();
  const [targetProperty, setTargetProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (id) {
      const target = data.find((e: Property) => e.id === `${id}`);
      if (target) {
        setTargetProperty(target);
      } else {
        // redirect 404
      }
    }
  }, [id]);

  if (!targetProperty) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return <div>Detail</div>;
}
