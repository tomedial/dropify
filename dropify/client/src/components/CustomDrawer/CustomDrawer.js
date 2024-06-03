import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar, CardHeader, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { convertTimestamp } from "../../helper/helper";
import "./customDrawer.css";

const CustomDrawer = ({ isOpen, toggleDrawer, messages, setMessages }) => {
  const handleDeleteMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  return (
    <div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            backgroundColor: "black",
          },
        }}
      >
        <Box className="CardWrapper">
          <div className="textCenter">
            <h3 className="fontWhite">Messages</h3>
          </div>
          <div className="scrollable-content">
            {messages.length === 0 ? (
              <Typography variant="body2" className="MessageInfo">
                No messages have been received at this time.
              </Typography>
            ) : (
              messages.map((message, index) => (
                <Card className="CardBody" key={index}>
                  <CardHeader
                    avatar={<Avatar src={message.from.avatar} />}
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={() => handleDeleteMessage(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    title={message.from.name}
                    subheader={convertTimestamp(message.timestamp)}
                  />
                  <CardContent>
                    {message.message.text.split("\n").map((line, index) => (
                      <>
                        {line}
                        <br />
                      </>
                    ))}
                    {message.file && (
                      <a
                        href={URL.createObjectURL(
                          new Blob([new Uint8Array(message.file)])
                        )}
                        download={message.message.fileName}
                      >
                        Download {message.message.fileName}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
