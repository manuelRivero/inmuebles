import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Property } from "../types/properties";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Stack,
  colors,
  Button,
  Modal,
  InputLabel,
} from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import Grid from "@mui/material/Grid";
import CustomInput from "../components/shared/customInput";
import {
  useForm,
  Controller,
  useFieldArray,
  FieldValues,
} from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "../theme";
import { updateProperty } from "../store/properties/propertiesSlice";
import ImageModal from "../components/shared/imageModal";
import VideoModal from "../components/shared/videoModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { properties: data } = useAppSelector(
    (state: RootState) => state.properties
  );

  const { handleSubmit, reset, control } = useForm();

  const { fields, append, remove } = useFieldArray<any>({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "media", // unique name for your Field Array
  });

  const [targetProperty, setTargetProperty] = useState<Property | null>(null);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

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
          append({ source: item.source, type: item.type });
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

  const submit = (values: any) => {
    dispatch(updateProperty({ id, values }));
    console.log("Values", values);
    navigate("/");
  };

  return (
    <Container
      sx={(theme) => ({ marginTop: theme.spacing(4), paddingBottom: "100px" })}
    >
      <Typography align="center" variant="h3" component="h3">
        Edición del inmueble
      </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Stack direction={"row"} justifyContent="center">
          <Grid
            container
            spacing={2}
            sx={(theme) => ({ marginTop: theme.spacing(4), maxWidth: "600px" })}
          >
            <Grid item xs={12} md={6}>
              <Controller
                rules={{ required: "Campo requerido" }}
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
                rules={{ required: "Campo requerido" }}
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
                rules={{ required: "Campo requerido" }}
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
                rules={{ required: "Campo requerido" }}
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
                rules={{ required: "Campo requerido" }}
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
        <Typography
          align="center"
          variant="h3"
          sx={{ marginTop: theme.spacing(4) }}
          component="h3"
        >
          Multimedia de la propiedad
        </Typography>
        <Stack direction={"row"} justifyContent="center">
          <Grid
            container
            spacing={4}
            sx={(theme) => ({ marginTop: theme.spacing(2), maxWidth: "600px" })}
            justifyContent={"center"}
          >
            {fields.map((item: any, index) => {
              const { source, type } = item;
              return (
                <Grid item md={4}>
                  <Box
                    sx={(theme) => ({ position: "relative", height: "100%" })}
                  >
                    {type === "image" ? (
                      <img
                        src={`${source}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <iframe
                        id="yt-video-iframe"
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${source}`}
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
                        cursor: "pointer",
                      })}
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <CloseIcon style={{ color: "white" }} />
                    </Box>
                  </Box>
                </Grid>
              );
            })}

            <Grid item md={4}>
              <Box
                sx={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginTop: "15px" }}
                >
                  <Typography>Agregar nueva</Typography>
                  <Button
                    variant="outlined"
                    sx={{ border: "1px solid #c2c2c2", borderRadius: "5px" }}
                    onClick={() => setShowImageModal(true)}
                  >
                    Imagen
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ border: "1px solid #c2c2c2", borderRadius: "5px" }}
                    onClick={() => setShowVideoModal(true)}
                  >
                    Video
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Stack>
        <Stack
          spacing={2}
          sx={{ marginTop: "20px" }}
          direction={"row"}
          justifyContent="center"
        >
          <Button variant="outlined" color="info" onClick={() => navigate("/")}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Stack>
      </form>

      <ImageModal
        open={showImageModal}
        onClose={() => setShowImageModal(false)}
        append={append}
      />
      <VideoModal
        open={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        append={append}
      />
    </Container>
  );
}
