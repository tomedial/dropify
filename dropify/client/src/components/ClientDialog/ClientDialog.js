import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { notifyAlert } from "../../helper/helper";

const ClientDialog = ({
  isDialogOpen,
  closeDialog,
  sendMessage,
  file,
  setFile,
  fileName,
  setFileName,
  messageText,
  setMessageText
}) => {
  
  const [isLoading, setIsLoading] = useState(false);
  
  const fileInput = useRef();

  const handleTextChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleFileChange = (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // Check if file size is less than or equal to 5MB
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile({ fileName: file.name, file: reader.result });
        setIsLoading(false);
      };
      reader.onerror = () => {
        notifyAlert("An error occurred while reading the file.");
        setIsLoading(false);
      };
      reader.readAsArrayBuffer(file);
    } else {
      notifyAlert("File is too large. Maximum size is 10MB.");
      setIsLoading(false);
    }
    event.target.value = null;
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName(null);
  };
  console.log("file: ", file);

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      PaperProps={{
        sx: {
          backgroundColor: "lightgrey",
        },
      }}
    >
      <DialogTitle>Send a message</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="message"
          multiline
          label="Message"
          type="text"
          fullWidth
          variant="standard"
          value={messageText}
          onChange={handleTextChange}
        />
        <input
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          disabled={isLoading}
        >
          Upload File
          {isLoading && <CircularProgress size={20} sx={{marginLeft: 2, color: "white" }}/>}
        </Button>
        {fileName && (
          <Box display="flex" alignItems="center">
            <Typography>{fileName}</Typography>
            <IconButton onClick={handleRemoveFile}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            onClick={() => sendMessage({ text: messageText, file: file })}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDialog;
