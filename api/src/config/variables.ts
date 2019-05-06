import * as path from 'path';

// import .env variables
// require('dotenv-safe').load({
//   allowEmptyValues: true,
//   // path: path.join(__dirname, '../../.env'),
//   // path: path.join(__dirname, '../../.env.example'),
// });

export const variables = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TESTS
      : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
