const DEVELOPMENT = 'development';
const TEST = 'test';
const env = process.env.NODE_ENV || DEVELOPMENT;
const { env: processEnv } = process;

if (env === 'development') {
  processEnv.PORT = 3000;
  processEnv.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  processEnv.PORT = 3001;
  processEnv.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
