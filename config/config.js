const DEVELOPMENT = 'development';
const TEST = 'test';
const env = process.env.NODE_ENV || DEVELOPMENT;
const { env: processEnv } = process;

if (env === 'development') {
  processEnv.PORT = 8443;
  processEnv.MONGODB_URI = 'mongodb://localhost:27017/BookstoreApp';
} else if (env === 'test') {
  processEnv.PORT = 8444;
  processEnv.MONGODB_URI = 'mongodb://localhost:27017/BookstoreAppTest';
}
