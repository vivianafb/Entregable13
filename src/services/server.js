import MongoStore from 'connect-mongo';
import config from '../config';
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_URL,
    mongoOptions: advancedOptions,
  }),

  secret: 'cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600*1000
  },
};
