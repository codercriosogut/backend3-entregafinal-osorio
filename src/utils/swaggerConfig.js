import swaggerJSDoc  from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API CRUD documentation',
        },
        servers: [
            {
                url: 'http://localhost:${process.env.PORT || 8080}',
            },
        ],
    },
    apis: ['./src/routes/users.router.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const configureSwagger = (app) => {
  app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default configureSwagger;
