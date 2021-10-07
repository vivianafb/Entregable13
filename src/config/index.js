import dotenv from 'dotenv';
dotenv.config();

const venvs = {
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV || 'mongoSRV',
  PORT: process.env.PORT || 8080,
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'LOCALDB'
};

export default venvs;