import app from './app';
import * as db from './db';
import './redis-connection';

const HOST = process.env.SERVER_HOST as string;
const PORT = Number(process.env.SERVER_PORT);

app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}.`));
db.listen().then(() => {}).catch(() => {});
