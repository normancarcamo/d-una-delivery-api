import mongoose, { Connection } from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;

type Listen = () => Promise<Connection>;

export const listen: Listen = () => new Promise((resolve, reject) => {
  const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  console.log('URI:', MONGO_URL);
  mongoose.connect(MONGO_URL, options);
  mongoose.Promise = Promise;
  mongoose.set('useFindAndModify', false);

  const db = mongoose.connection;

  db.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(`Cannot stablish connection with mongo database`, e);
      mongoose.connect(MONGO_URL, options);
    } else {
      console.log(e);
    }
    reject(e);
  });

  db.once('open', () => {
    console.log(`MongoDB successfully connected to ${MONGO_URL}`);
    resolve(db);
  });
});
