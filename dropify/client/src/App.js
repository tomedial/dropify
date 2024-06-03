import "./index.css";
import "./app.css";
import Starfield from "react-starfield";
import useSocket from "./hooks/useSocket";
import ClientDialog from "./components/ClientDialog/ClientDialog";
import AvatarScreen from "./components/AvatarScreen/AvatarScreen";
import IdentityScreen from "./components/IdentityScreen/IdentityScreen";
import useAppLogic from "./hooks/useAppLogic";
import useDisplayDeviceInfo from "./hooks/useDisplayDeviceInfo";
import CustomDrawer from "./components/CustomDrawer/CustomDrawer";

function App() {
  const {
    isOpen,
    hasNewMessage,
    identity,
    clients,
    showText,
    setShowText,
    activeAnimations,
    setActiveAnimations,
    isDialogOpen,
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
    fileName,
    setFileName,
    messageText,
    setMessageText
  } = useAppLogic();

  const { emitMessageToSocket } = useSocket(
    process.env.REACT_APP_WSURI,
    handleServerMessage,
    handleError
  );

  useDisplayDeviceInfo(activeAnimations, clients, identity);

  return (
    <div className="App">
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <CustomDrawer
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        messages={messages}
        setMessages={setMessages}
      />
      <div className="MainScreen">
        <ClientDialog
          closeDialog={closeDialog}
          isDialogOpen={isDialogOpen}
          sendMessage={(message) => sendMessage(message, emitMessageToSocket)}
          file={file}
          setFile={setFile}
          fileName={fileName}
          setFileName={setFileName}
          messageText={messageText}
          setMessageText={setMessageText}
        />
        <AvatarScreen
          showText={showText}
          setShowText={setShowText}
          clients={clients}
          identity={identity}
          setActiveAnimations={setActiveAnimations}
          openDialog={openDialog}
        />
      </div>
      <div className="Footer">
        <IdentityScreen
          identity={identity}
          toggleDrawer={toggleDrawer}
          hasNewMessage={hasNewMessage}
        />
      </div>
    </div>
  );
}

export default App;
