import { connect } from "mongoose";
import { mongoURL, connectWithRetryTime } from '../config/config.js';

let lastConnectionAttempt = 0;

export const connectWithRetry = async () => {
  try {
    if (!mongoURL) throw new Error('The address to the database is not specified');

    await connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });

    console.log('=== MongoDB connected successfully');
  } catch (error) {
    console.log(`=== MongoDB connection failed, retrying in ${connectWithRetryTime} ms ...`);
    const now = Date.now();
    if (now - lastConnectionAttempt < connectWithRetryTime) {
      console.log('=== Not retrying yet, waiting for previous attempt to finish ...');
    } else {
      lastConnectionAttempt = now;
      setTimeout(connectWithRetry, connectWithRetryTime);
    }
  }
};