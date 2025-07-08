// server/server.js
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(join(__dirname, "../dist")));

app.get("*", (req, res) => {
  const html = ReactDOMServer.renderToString(
    React.createElement(App, { url: req.url }) // ✅ Fix here
  );

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>react-hydrate-flash</title>
      <meta name="description" content="Lovable Generated Project" />
      <meta name="author" content="Lovable" />
      <meta property="og:title" content="react-hydrate-flash" />
      <meta property="og:description" content="Lovable Generated Project" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lovable_dev" />
      <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
    </head>
    <body>
      <div id="root">${html}</div>
      <script type="module" src="/client.bundle.js"></script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
