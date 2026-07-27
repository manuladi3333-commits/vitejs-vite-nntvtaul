// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { initDB } from "./db";
import App from "./App";

const root = createRoot(document.getElementById("root"));
const result = await initDB();

if (result.ok) {
  root.render(
      <React.StrictMode>
            <App />
                </React.StrictMode>
                  );
                  } else {
                    root.render(
                        <div style={{ padding: 24, fontFamily: "system-ui" }}>
                              <h1>Storage unavailable</h1>
                                    <p>This app needs local storage to run. Try leaving private browsing mode.</p>
                                          <p style={{ color: "#888" }}>{String(result.error)}</p>
                                              </div>
                                                );
                                                }