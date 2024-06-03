import { Avatar, Badge, Box } from "@mui/material";
import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import "./identityScreen.css";

const IdentityScreen = ({ identity, toggleDrawer, hasNewMessage }) => {
  return (
    <>
      <Box
        className="IdentityWrapper"
      >
        <Avatar src={identity?.avatar} alt="Avatar" />
        <span style={{ marginLeft: "10px" }}>
          You are visible as "{identity?.name}"
        </span>
      </Box>
      <Box
        className="MessagesBoxWrapper"
        onClick={toggleDrawer}
      >
        {hasNewMessage ? (
          <Badge overlap="circular" variant="dot" color="warning">
            <MailOutlineIcon />
          </Badge>
        ) : (
          <MailOutlineIcon onClick={toggleDrawer} />
        )}
        <span style={{ marginLeft: "10px" }}>Messages</span>
      </Box>
    </>
  );
};

export default IdentityScreen;
