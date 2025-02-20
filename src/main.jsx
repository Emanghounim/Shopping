import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
 
    <App />
 
);
