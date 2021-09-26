import { query } from 'express';
import mongoose from 'mongoose';
import Config from '../config';

export const connectToDB = async () => {
  try {
    const srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    console.log('CONECTANDO A MI DB');
    await mongoose.connect(srv, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('YA ESTOY CONECTADO');
    return 'Connection Established';
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};