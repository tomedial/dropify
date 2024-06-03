import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ClientAvatar from "../ClientAvatar/ClientAvatar";

const AvatarScreen = ({
  showText,
  setShowText,
  clients,
  identity,
  setActiveAnimations,
  openDialog,
}) => {
  return (
    <>
      {showText && (
        <div className="textCenter">
          <p className="fontWhite">
            No devices found on the same network.
          </p>
          <small className="fontWhite">
            To interact with other clients, visit this website from another
            device on the same network.
          </small>
        </div>
      )}

      <TransitionGroup component={null}>
        {clients.map((client) => {
          if (client.clientId === identity.id) return null;
          return (
            <CSSTransition
              key={client.id}
              timeout={2000}
              classNames="fade"
              onEnter={() => {
                setActiveAnimations((prev) => prev + 1);
                setShowText(false);
              }}
              onExited={() => {
                setActiveAnimations((prev) => prev - 1);
              }}
            >
              <ClientAvatar
                client={client}
                onClick={() => openDialog(client)}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </>
  );
};

export default AvatarScreen;
