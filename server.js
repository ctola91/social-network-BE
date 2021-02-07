const express = require("express");
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
// const morgan = require("morgan");
require("dotenv").config();

const { PORT } = require("./config/config");

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/users.js", "./routes/posts.js", "./routes/login.js"],
};

const specs = swaggerJSDoc(options);

app.use(bodyParser.json());
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);
// middleware para subir archivos
// app.use(fileUpload());
// app.use(morgan("dev"));

app.use(require("./routes"));

app.listen(PORT, () => {
  console.log("Listen PORT: ", PORT);
});

module.exports = app;
