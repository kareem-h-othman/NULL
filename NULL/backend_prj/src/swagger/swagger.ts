import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gym Class Booking API',
      version: '1.0.0',
      description: 'API for user management and authentication, session management, and booking management',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://null-production-e8a8.up.railway.app'
          : 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);