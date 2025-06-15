const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ToDo API',
      version: '1.0.0',
      description: 'API documentation for the ToDo app',
    },
  },
  apis: ['./src/routes/*.ts'], // Adjust path if your route files are elsewhere
};

export default swaggerOptions; 