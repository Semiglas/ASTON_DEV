import React, { createContext, useState, useEffect, useMemo } from "react";

export const FeatureFlagsContext = createContext();

export const FeatureFlagsProvider = ({ children }) => {
  const [featureFlags, setFeatureFlags] = useState({});

  const shareToTelegram = async (id) => {
    let shareUrl = `${window.location.origin}/movie/${id}`;
    const telegramShareUrl = `https://telegram.me/share?url=${encodeURIComponent(shareUrl)}`;
    window.open(telegramShareUrl, "_blank");
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/feature-flags")
      .then((response) => response.json())
      .then((data) => setFeatureFlags(data));
  }, []);

  const value = useMemo(
    () => ({ featureFlags, shareToTelegram }),
    [featureFlags, shareToTelegram]
  );

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};
