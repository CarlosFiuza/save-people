import process from 'node:process';

const postgresUrl = process.env?.POSTGRES_URL;
const appEnv = process.env?.APP_ENV;

if (!postgresUrl || !appEnv || ['local', 'cloud'].includes(appEnv)) {
  console.error('Invalid environment variables');

  throw new Error('Invalid environment variables');
}
