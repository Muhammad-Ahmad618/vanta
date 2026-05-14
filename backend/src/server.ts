import express from "express";

const app = express();
const PORT = 8000;

console.log("starting server ....");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
