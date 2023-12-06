import { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Stack } from "@mui/material";
import { UseFieldArrayAppend } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  append: UseFieldArrayAppend<any, any>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function ImageModal({ open, onClose, append }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      handlePreview(e.target.files[0]);
    }
  };

  const handlePreview = async (e: File) => {
    const objectUrl: string = URL.createObjectURL(e);
    setImageSrc(objectUrl);
  };

  const submit = () => {
    if(imageSrc){
      append({ source: imageSrc, type: "image" });
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Carga una imagen
        </Typography>

        <Box sx={{ marginLeft: ".8rem", marginTop: "10px" }}>
          <Box sx={{ marginBottom: ".25rem" }}>
            {file ? (
              <div>
                <img
                  src={`${imageSrc}`}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    maxHeight: "400px",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <Typography variant="body1" component="p">
                  {file.name}
                </Typography>
              </div>
            ) : (
              <Typography variant="body1" component="p">
                No se ha seleccionado ningún archivo.
              </Typography>
            )}
          </Box>
          <Box marginTop={2}>
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
            <Stack justifyContent="center" direction="row" spacing={2}>
              {file && (
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => {
                    onClose();
                    setFile(null);
                  }}
                >
                  Cancelar
                </Button>
              )}
              {file ? (
                <Button variant="contained" type="button" onClick={submit}>
                  Guardar
                </Button>
              ) : (
                <Button variant="contained">
                  <label htmlFor="file-input">Subir imagen</label>
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
