import swaggerJsDoc  from "swagger-jsdoc";
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
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./src/routes/users.router.js'],
};

const swaggerDocs = swaggerJsDoc (swaggerOptions);

export default (app) => {
    app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

