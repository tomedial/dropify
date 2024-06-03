import { Avatar, Box } from "@mui/material";
import "./clientAvatar.css";

const ClientAvatar = ({client, onClick}) => {
  return (
    <Box
      className="ClientAvatarWrapper"
      onClick={onClick}
    >
      <Avatar
        className="ClientAvatar"
        src={client.avatar}
      />
      <Box className="ClientAvatarName">{client.name}</Box>
    </Box>
  );
};

export default ClientAvatar;
