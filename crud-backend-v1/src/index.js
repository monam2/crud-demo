import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoute.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", clientRoutes);

app.listen(port, () => {
  console.log(`${port}번 포트에서 실행 중`);
});
