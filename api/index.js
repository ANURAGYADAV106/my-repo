// import dotenv from "dotenv";
// dotenv.config(); // ✅ MUST be FIRST

import app from "./app.js";

const PORT = 4000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
