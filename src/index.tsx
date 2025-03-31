import React from "react";
import { createRoot } from "react-dom/client";

import "../scss/main.scss";
import App from "./App";

// Render app
const domNode = document.getElementById("app-container");
const root = createRoot(domNode);
root.render(<App />);
