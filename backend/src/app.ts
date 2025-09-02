import config from '@/config/config';
import express from 'express';
import { apiRouter } from '@/app.routes';
import {
  connectToDatabase,
  disconnectFromDatabase,
} from '@/database/connection';
import { authenticationMiddleware } from '@/middlewares/authentication.middleware';
import { errorHandlingMiddleware } from './middlewares/errorhandling.middleware';

const port = config.port;

const app = express();

app.get('/health', (req, res) => {
  res.send('Healthy!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandlingMiddleware);
app.use('/api', apiRouter);

const startServer = async () => {
  try {
    // Connect to MongoDB before starting the server
    await connectToDatabase();

    const server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`\nReceived ${signal}. Shutting down gracefully...`);

      server.close(async () => {
        console.log('HTTP server closed.');

        try {
          await disconnectFromDatabase();
          console.log('Database connection closed.');
          process.exit(0);
        } catch (error) {
          console.error('Error during shutdown:', error);
          process.exit(1);
        }
      });
    };

    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
