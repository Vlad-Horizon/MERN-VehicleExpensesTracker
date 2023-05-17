import express from 'express';
import mongoose, { connect } from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import routes from './routes/routes.js';
import { port, folderToSaveImg, mongoURL, connectWithRetryTime } from './config/config.js';
import { forcedCreateFolder } from './utils/fileSystemUtils.js';

// ----------------------------------------------------------------------

forcedCreateFolder(`./${folderToSaveImg}`);

// ----------------------------------------------------------------------

const app = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}));
app.use(cors());

// ----------------------------------------------------------------------

const startServer = async () => {
  try {
    if (!mongoURL) throw 111;

    await connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });

    console.log('=== MongoDB connected successfully');

    //

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
        mongoose.connection
          .close()
          .then(() => {
            console.log('Mongoose connection closed');
          })
          .catch((err) => {
            console.error('Error closing Mongoose connection:', err);
          });
      });
    });
  } catch (error) {
    if (error === 111) {
      console.log(`=== Error start server: ${error}`);
      return;
    }

    if (error !== 111) {
      console.log(`=== MongoDB connection failed, retrying in ${connectWithRetryTime} ms ...`);
      setTimeout(startServer, connectWithRetryTime);
      return;
    }
  }
};

startServer();
