import express from "express";
import resourceRouter from "./routes/resource.routes";

const app = express();

app.use(express.json());
app.use("/api/items", resourceRouter);

export default app;

