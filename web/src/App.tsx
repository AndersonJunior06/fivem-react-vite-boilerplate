import React, { useEffect, useState } from "react";
import { fetchNui } from "./nui";

function App() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data.action === "open") {
        setMessage(event.data.data.message);
        setVisible(true);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.85)",
        color: "white",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>NUI com Vite ⚡</h1>
      <p>{message}</p>
      <button
        onClick={() => {
          fetchNui("closeUI", { reason: "Usuário clicou no botão" });
          setVisible(false);
        }}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Fechar UI
      </button>
    </div>
  );
}

export default App;
