require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Vinted API",
    description: "Designed for Le Reacteur Bootcamp",
    version: "0.0.1",
  },
  host: process.env.SWAGGER_HOST,
  schemes: [process.env.SWAGGER_SCHEMES],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.js");
});
