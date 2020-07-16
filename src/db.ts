import mongoose, { Connection } from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;

type Listen = () => Promise<Connection>;

export const listen: Listen = () => new Promise((resolve, reject) => {
  const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };

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
  db.on('disconnected', () => {
    console.log('Mongo connection closed.');
  });
  db.once('open', () => {
    console.log(`Mongo successfully connected.`);
    resolve(db);
  });

  process.on('SIGINT', async () => {
    await db.close();
    process.exit(0);
  });
});
