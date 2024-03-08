import express from "express";
import cors from "cors";
const app = express();
const port = 3001;

app.use(cors());

app.get("/api/feature-flags", (req, res) => {
  res.json({ isTelegramShareEnabled: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
