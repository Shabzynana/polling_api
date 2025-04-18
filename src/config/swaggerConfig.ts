import swaggerJsdoc, { SwaggerDefinition } from "swagger-jsdoc";
import config from ".";
import { version } from "../../package.json";

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
      url: "https://polling-api-kappa.vercel.app/",
      description: "Live server",
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
    // {
    //   name: "Authentication",
    //   description: "A list of routes for Authentication",
    // },
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

const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
    "./src/services/*.ts",
    "./src/schema/*.ts",
    "./src/docs/*.ts",
  ],
};

const specs = swaggerJsdoc(options);

export default specs;
