import { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Stack } from "@mui/material";
import { UseFieldArrayAppend } from "react-hook-form";
import CustomInput from "../../../components/shared/customInput";


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

export default function VideoModal({ open, onClose, append }: Props) {
  const [idVideo, setIdVideo] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  const submit = (value) => {
    console.log("Value", value)
    if (idVideo) {
      append({ source: idVideo, type: "video" });
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
          Carga un video
        </Typography>
        <Typography>
          Asegúrate que tu video se visualice correctamente
        </Typography>

        <Box sx={{ marginLeft: ".8rem", marginTop: "10px" }}>
          <iframe
            id="yt-video-iframe"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${idVideo}`}
            style={{ width: "100%" }}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          <Box marginTop={2}>
            <CustomInput
              type="text"
              label="ID del video en YouTube"
              placeholder="ID YouTube video"
              value={idVideo || ""}
              onChange={(
                e: React.ChangeEvent<
                  HTMLInputElement | HTMLTextAreaElement
                >
              ) => setIdVideo(e.target.value)}
            />

            <Stack
              justifyContent="center"
              direction="row"
              spacing={2}
              marginTop={2}
            >
              <Button variant="outlined" color="info" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="contained" type="button" onClick={submit}>
                Guardar
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
