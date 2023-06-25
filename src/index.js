import express from "express";
import { create } from "express-handlebars";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// TODO Routes
import indexRouter from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(indexRouter);

const startApp = () => {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startApp();
