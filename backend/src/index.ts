import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import routes from "./routes";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(port, () => console.log(`Running in port ${port}`));
