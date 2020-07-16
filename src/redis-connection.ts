import redis from 'redis';

const host = process.env.REDIS_HOST as string;
const port = +(process.env.REDIS_PORT as string);

const client = redis.createClient({ host, port });

client.on('connect', () => {
  console.log('Redis connected.');
});

client.on('ready', () => {
  console.log('Redis is ready to use.');
});

client.on('error', (err) => {
  console.log('Redis error:', err);
});

client.on('end', () => {
  console.log('Redis disconnected.');
});

process.on('SIGINT', () => {
  client.quit();
});

export default client;
