import * as mongoose from 'mongoose';
import { variables } from './variables';

export class Mongoose {
  constructor(){
    this.connect()
    this.events();
    this.options();
  }

  connect() {
    mongoose.Promise = require('bluebird');
    mongoose.connect(variables.mongo.uri, {
      keepAlive: 1
    });
    return mongoose.connection;
  }

  options() {
    if (variables.env === 'development') {
      mongoose.set('debug', true);
    }
  }

  events() {
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
      process.exit(-1);
    });

    mongoose.connection.on('connected', (ev) => {
      console.log('Mongoose Connected...');
    });
  }
}

export default new Mongoose();