const express = require("express");
const app = express();
const cors = require("cors");

// Prevents CORS error
app.use(cors());

// Enable body-parsing
app.use(express.json());

// Bring in the route
const nutrition = require("./routes/nutrition");

// Use the route
app.use("/api/nutrition", nutrition);

// Set the port
const port = 5000;

// Start the app
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
