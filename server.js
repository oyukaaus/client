const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

// Read SSL certificate files
const options = {
  key: fs.readFileSync(path.join(__dirname, "private.key")),
  cert: fs.readFileSync(path.join(__dirname, "STAR_starlinknomad_mn.crt")),
  ca: [
    fs.readFileSync(
      path.join(__dirname, "SectigoRSADomainValidationSecureServerCA.crt")
    ),
    fs.readFileSync(path.join(__dirname, "USERTrustRSAAAACA.crt")),
  ],
};

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Define a route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const server = https.createServer(options, app);

server.listen(8443, () => {
  console.log("Server is running on port 8443");
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
