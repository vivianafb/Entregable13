import mongoose from 'mongoose';
import Config from '../config';

export const connectToDB = async () => {
  try {
    const srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    await mongoose.connect(srv, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('YA ESTOY CONECTADO');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};