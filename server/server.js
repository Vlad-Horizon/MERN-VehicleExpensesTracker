import express from 'express';
import mongoose from "mongoose";
import fileUpload from 'express-fileupload';
import cors from 'cors';
import routes from './routes/routes.js';
import { port, folderToSaveImg } from './config/config.js';
import { checkDirectoryExistsAndCreate } from './utils/checkDirectoryExists.js';
import { connectWithRetry } from './utils/connectWithRetry.js';

// ----------------------------------------------------------------------

checkDirectoryExistsAndCreate(`./${folderToSaveImg}`);

// ----------------------------------------------------------------------

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}))
app.use(cors())

// ----------------------------------------------------------------------

const startServer = async () => {
  try {
    await connectWithRetry();

    app.use('/', routes);

    app.listen(port, () => {
      console.log(`=== The Server is listening on port ${port}`);
    });

    // Обробник події SIGINT для плавної зупинки сервера
    process.on('SIGINT', () => {
      console.log('SIGINT signal received. Closing server gracefully.');
      server.close(() => {
        console.log('Server has been closed.');
        // Disconnect from MongoDB
        mongoose.connection.close().then(() => {
          console.log('Mongoose connection closed');
        }).catch((err) => {
          console.error('Error closing Mongoose connection:', err);
        });
      });
    });
  } catch (error) {
    console.log(`=== Failed to connect to MongoDB, ${error}`);
  }
};

startServer();