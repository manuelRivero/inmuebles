import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property } from "../types/properties";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Stack,
  colors,
} from "@mui/material";
import { RootState, useAppSelector } from "../store/store";
import Grid from "@mui/material/Grid";
import CustomInput from "../components/shared/customInput";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "../theme";

export default function Detail() {
  const { id } = useParams();
  console.log("ID", id);
  const { properties: data } = useAppSelector(
    (state: RootState) => state.properties
  );
  const [targetProperty, setTargetProperty] = useState<Property | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    reset,
    control,
  } = useForm();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "media", // unique name for your Field Array
    }
  );

  useEffect(() => {
    if (id) {
      const target = data.find((e: Property) => e.id === `${id}`);
      if (target) {
        setTargetProperty(target);
        reset({
          address: target.address,
          salePrice: target.salePrice,
          rentPrice: target.rentPrice,
          status: target.status,
          m2: target.m2,
        });
        target.media.forEach((item) => {
          append({ source: item.src, type: item.type });
        });
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
  return (
    <Container sx={(theme) => ({ marginTop: theme.spacing(4) })}>
      <Typography align="center" variant="h3" component="h3">
        Edición del inmueble
      </Typography>
      <Stack direction={"row"} justifyContent="center">
        <Grid
          container
          spacing={2}
          sx={(theme) => ({ marginTop: theme.spacing(4), maxWidth: "600px" })}
        >
          <Grid item xs={12} md={6}>
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="Direccion"
                    type="text"
                    value={field.value}
                    error={fieldState.error}
                    placeholder="Direccion del inmueble"
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => field.onChange(e.target.value)}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="salePrice"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="Precio de venta"
                    type="text"
                    value={field.value}
                    error={fieldState.error}
                    placeholder="Precio de venta del inmueble"
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => field.onChange(e.target.value)}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="rentPrice"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="Precio de alquiler"
                    type="text"
                    value={field.value}
                    error={fieldState.error}
                    placeholder="Precio de alquiler del inmueble"
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => field.onChange(e.target.value)}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="Status de venta"
                    type="text"
                    value={field.value}
                    error={fieldState.error}
                    placeholder=""
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => field.onChange(e.target.value)}
                    disabled={true}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="m2"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <CustomInput
                    label="Área del inmueble (en metros cuadrados)"
                    type="text"
                    value={field.value}
                    error={fieldState.error}
                    placeholder=""
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => field.onChange(e.target.value)}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Typography align="center" variant="h3" component="h3">
        Multimedia de la propiedad
      </Typography>
      <Stack direction={"row"} justifyContent="center">
      <Grid
        container
        spacing={2}
        sx={(theme) => ({ marginTop: theme.spacing(4), maxWidth: "600px" })}
        justifyContent={"center"}
      >
        {fields.map((item, index) => (
          <Grid item md={4}>
            <Box sx={(theme) => ({ position: "relative" })}>
              {targetProperty.media[index].type === "image" ? (
                <img src={`${targetProperty.media[index].src}`} style={{ width: "100%" }} />
              ) : (
                <iframe
                  width="100%"
                  src={`https://www.youtube.com/embed/${targetProperty.media[index].src}`}
                  style={{ width: "100%" }}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              )}
              
              <Box
                sx={(theme) => ({
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  top: "5px",
                  right: "5px",
                  backgroundColor: theme.palette.error.main,
                  borderRadius: "9999px",
                  padding: "5px",
                  cursor: "pointer"
                })}

                onClick={() => {
                  remove(index)
                }}
              >
                <CloseIcon style={{ color: "white" }} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      </Stack>
    </Container>
  );
}
