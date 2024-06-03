import AWN from "awesome-notifications";
import { useState, useCallback } from "react";
import { notifyAlert, notifyInfo } from "../helper/helper";

export default function useAppLogic() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [clients, setClients] = useState([]);
  const [showText, setShowText] = useState(true);
  const [activeAnimations, setActiveAnimations] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [targetClient, setTargetClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [fileName, setFileName] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    if (hasNewMessage) {
      setHasNewMessage(false);
    }
  };

  const openDialog = (client) => {
    setTargetClient(client);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setMessageText("")
    setFile(null);
    setFileName(null);
    setIsDialogOpen(false);
  };

  const handleServerMessage = useCallback((message, buffer) => {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "connection") {
      setIdentity(parsedMessage);
    }

    if (parsedMessage.type === "update") {
      setClients(parsedMessage.clients);
    }

    if (parsedMessage.type === "message") {
      console.log({...parsedMessage, file: buffer})
      setMessages((prev) => [...prev, {...parsedMessage, file: buffer}]);
      
      if (!isOpen) {
        setHasNewMessage(true);
      }
      notifyInfo("You've got a new message");
    }

    // eslint-disable-next-line
  }, []);

  const handleError = useCallback((error) => {
    notifyAlert(error);
    // eslint-disable-next-line
  }, []);

  const sendMessage = (message, socketCb) => {
    if (message.text === "" && message.file === null) {
      notifyAlert("Please enter a message or file");
      return;
    }
    const socketMessage = {
      type: "message",
      from: identity,
      targetClientId: targetClient.clientId,
      text: message.text,
      fileName: message.file ? message.file.fileName : null,
    };
    
    socketCb(JSON.stringify(socketMessage), message.file?.file);
    closeDialog();
  };

  return {
    isOpen,
    hasNewMessage,
    identity,
    clients,
    showText,
    setShowText,
    activeAnimations,
    setActiveAnimations,
    isDialogOpen,
    targetClient,
    messages,
    setMessages,
    toggleDrawer,
    openDialog,
    closeDialog,
    handleServerMessage,
    handleError,
    sendMessage,
    file,
    setFile,
    notifyAlert,
    messageText,
    setMessageText,
    fileName,
    setFileName
  };
}
