const express = require("express");
const server = express();

// Bring in the route
const nutrition = require("./routes/nutrition");

// Use the route
server.use("/api/nutrition", nutrition);

// Set the port
const port = 5000;

server.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
