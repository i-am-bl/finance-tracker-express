import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import { syncModels } from "./database/syncModels.js";
import transactionRouter from "./routes/transactions.js";
import accountRouter from "./routes/accounts.js";
import userRouter from "./routes/users.js";
import signupRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import { errorHandler } from "./middleware/errorHandler.js";
import routers from "./constants/routers.js";
import YAML from "yamljs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import redoc from "redoc-express";

config();

async function startServer() {
  await syncModels();

  const app = express();
  const cwd = process.cwd();
  const targDir = "openapi-docs";
  const openapiDocs = "openapi.yaml";
  const targLoc = path.resolve(cwd, targDir, openapiDocs);
  const swaggerDoc = YAML.load(targLoc);
  const specUrl = `http://localhost:3000/openapi-docs/openapi.yaml`;

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.use(
    "/openapi-docs",
    express.static(path.join(cwd, targDir), {
      setHeaders: (res, path) => {
        res.set("Cache-Control", "no-store");
      },
    })
  );
  app.get("/redoc", (req, res) => {
    res.send(`
      <!DOCTYPE html>
<html>
  <head>
    <title>Redoc</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

    <!--
    Redoc doesn't change outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <redoc spec-url='/openapi-docs/openapi.yaml'></redoc>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
  </body>
</html>
    `);
  });

  const apiv1 = routers.v1.def;
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cookieParser());

  app.use(apiv1, signupRouter);
  app.use(apiv1, loginRouter);
  app.use(apiv1, userRouter);
  app.use(apiv1, accountRouter);
  app.use(apiv1, transactionRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}...`);
  });
}

startServer();
