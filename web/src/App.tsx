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
    <div className="bg-black/85 text-white h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">NUI em TyperScript e tailwindcss</h1>
      <p className="text-lg">{message}</p>
      <button
        onClick={() => {
          fetchNui("closeUI", { reason: "Usuário clicou no botão" });
          setVisible(false);
        }}
        className="mt-5 px-5 py-2 cursor-pointer bg-gray-800 hover:bg-gray-700 rounded transition"
      >
        Fechar UI
      </button>
    </div>
  );
}

export default App;
