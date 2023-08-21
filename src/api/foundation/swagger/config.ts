import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: "Meetup API",
      version: "1.0.0",
      description: "Meetup API with user auth support",
    },
  },
  apis: ["**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
