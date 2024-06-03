import { useState, useEffect } from 'react';

export default function useDisplayDeviceInfo(activeAnimations, clients, identity) {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (
      activeAnimations === 0 &&
      clients.length === 1 &&
      clients[0].clientId === identity.id
    ) {
      setShowText(true);
    }
  }, [activeAnimations, clients, identity]);

  return showText;
}