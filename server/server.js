import express from 'express';
import mongoose, { connect } from "mongoose";
import fileUpload from 'express-fileupload';
import cors from 'cors';
import routes from './routes/routes.js';
import { port, mongoURL, connectWithRetryTime } from './config/config.js';

// ----------------------------------------------------------------------

const connectWithRetry = () => {
  connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log('=== MongoDB connected successfully');
  })
  .catch(() => {
    console.log(`=== MongoDB connection failed, retrying in ${connectWithRetryTime} ms ...`);
    setTimeout(connectWithRetry, connectWithRetryTime);
  });
};
connectWithRetry();

// ----------------------------------------------------------------------

const app = express();
app.use(express.json()); // connect JSON in app
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}))
app.use(cors())

app.use('/', routes);

const server = app.listen(port, () => {
  console.log(`=== The Server is listening on port ${port}`);
});

// Обробник події SIGINT для плавної зупинки сервера
process.on('SIGINT', () => {
  console.log('SIGINT signal received. Closing server gracefully.');
  server.close(() => {
    console.log('Server has been closed.');
    // Disconnect from MongoDB
    mongoose.connection.close()
    .then(() => {
      console.log('Mongoose connection closed');
    }).catch((err) => {
      console.error('Error closing Mongoose connection:', err);
    });
  });
});