import { useState, useEffect } from "react";

export default function useSessionStore() {
  const [sessionData, setSessionData] = useState(() => {
    const stored = localStorage.getItem("sessionData");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("sessionData", JSON.stringify(sessionData));
  }, [sessionData]);

  return { sessionData, setSessionData };
}
