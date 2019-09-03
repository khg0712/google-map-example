import express, {json} from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { ENV, PORT, MONGODB_URI } from './config';
import router from './routes';
import cors from 'cors';

const app = express();
const mongoUri = MONGODB_URI || 'mongodb://localhost:27017/map';
console.log(mongoUri);

mongoose.connect(mongoUri, { useNewUrlParser: true }).then(() => {
  console.log('mongo connected');
});

app
  .use(cors())
  .use(json())
  .use(express.urlencoded({ extended: false }))
  .use(router)
  .set('port', PORT || 3000)
  .set('env', ENV || 'development');

export default app;
export const disconnectDB = mongoose.disconnect;
