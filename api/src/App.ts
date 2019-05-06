import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as passport from 'passport';
import * as strategies from './config/passport';
import * as cors from 'cors';

// routers
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';
import settingsRouter from './routes/settings.router';
import orderRouter from './routes/order.router';
// config
import './config/mongoose';
import './config/passport';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor(
  ) {
    this.express = express();
    this.middleware();
    this.routes();
    this.passport();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(compress());
    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:4200");
      // res.setHeader('Access-Control-Allow-Origin', "*");
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Headers', 'application/json');
      
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      
      next();
    });
    this.express.use(cors());
  }

  private passport(): void {
    this.express.use(passport.initialize());
    passport.use('jwt', strategies.jwt);
    passport.use('facebook', strategies.facebookStrategy);
    passport.use('google', strategies.googleStrategy);
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Api is working'
      });
    });
    this.express.use('/', router);
    this.express.use('/api/v1/users', userRouter);
    this.express.use('/api/v1/auth', authRouter);
    this.express.use('/api/v1/settings', settingsRouter);
    this.express.use('/api/v1/orders', orderRouter);
  }

}

export default new App().express;
