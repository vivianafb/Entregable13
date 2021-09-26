import dotenv from 'dotenv';
dotenv.config();

const venvs = {
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'dbName',
  PORT: process.env.PORT || 8080,
};

export default venvs;