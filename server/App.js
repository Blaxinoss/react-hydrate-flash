import React from "react";
import { StaticRouter } from "react-router-dom/server";
import AppRoutes from "../Routes/AppRoutes.jsx"; // أو .jsx لو مدعوم

const App = ({ url }) =>
  React.createElement(
    StaticRouter,
    { location: url },
    React.createElement(AppRoutes)
  );

export default App;