import swaggerJsdoc, { SwaggerDefinition } from "swagger-jsdoc";
import config from ".";
// import { version } from "../../package.json";
import * as fs from "fs";
import * as path from "path";

const packagePath = path.resolve(__dirname, "../../package.json");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
const version = packageJson.version;

console.log("App version:", version);

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "Polling System API with Swagger",
    version: version,
    description: "OpenApi documentaiton for the Polling System project",
  },
  servers: [
    {
      url: `http://localhost:${config.port}/`,
      description: "Local server",
    },
    {
      url: "https://staging-polling-api.onrender.com/",
      description: "staging server",
    },
    {
      url: "https://polling-api-4p2v.onrender.com/",
      description: "Live server",
    },
  ],
  tags: [
    {
      name: "default",
      description: "A list of all default routes",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  externalDocs: {
    url: config.SWAGGER_JSON_URL,
  },
};

const isProd = process.env.NODE_ENV === "production";
const apis = isProd
  ? [
      "./dist/routes/*.js",
      "./dist/controllers/*.js",
      "./dist/services/*.js",
      "./dist/schema/*.js",
      "./dist/docs/*.js",
    ]
  : [
      "./src/routes/*.ts",
      "./src/controllers/*.ts",
      "./src/services/*.ts",
      "./src/schema/*.ts",
      "./src/docs/*.ts",
    ];

const options = {
  swaggerDefinition,
  apis,
};

// const options = {
//   swaggerDefinition,
//   apis: [
//     "./src/routes/*.ts",
//     "./src/controllers/*.ts",
//     "./src/services/*.ts",
//     "./src/schema/*.ts",
//     "./src/docs/*.ts",
//   ],
// };

const specs = swaggerJsdoc(options);

export default specs;
