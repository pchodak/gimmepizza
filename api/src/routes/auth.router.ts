import { Router, Request, Response } from 'express';
import * as validate from 'express-validation';
import * as httpStatus from 'http-status';
import User from '../models/user.model';
import RefreshToken from '../models/refresh-token.model';
import { oAuth } from '../middlewares/auth';
import * as moment from 'moment-timezone';
import { variables } from '../config/variables';
import {
  register,
  login,
  oAuthValidation,
  refresh
} from '../utils/auth.validation';
import { authorize, ADMIN, LOGGED_USER } from '../middlewares/auth';

export class AuthRouter {
  router: Router
  constructor() {
    this.router = Router();
    this.init();
  }
  
  init() {
    this.router.post('/register', validate(register), (this.register).bind(this));
    this.router.post('/login', validate(login), (this.login).bind(this));
    this.router.post('/refresh-token', validate(refresh), (this.refreshToken).bind(this));
  }


  // create user
  public async register(req: Request, res: Response) {
    try {
      const user = await (new User(req.body)).save();
      const userTransformed = user.transform();
      const token = this.generateTokenResponse(user, user.token());
      res.json({ token, user: userTransformed });
    } catch (error) {
      res.status(400).json(User.checkDuplicateEmail(error));
    }
  }

  // login user
  public async login(req: Request, res: Response) {
    try {
      const { user, accessToken } = await User.findAndGenerateToken(req.body);
      const token = this.generateTokenResponse(user, accessToken);
      const userTransformed = user.transform();
      return res.json({ token, user: userTransformed });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async refreshToken(req: Request, res: Response) {
    try {
      const { email, refreshToken } = req.body;
      const refreshObject = await RefreshToken.findOneAndRemove({
        userEmail: email,
        token: refreshToken,
      });
      const { user, accessToken } = await User.findAndGenerateToken({ email, refreshObject });
      const response = this.generateTokenResponse(user, accessToken);
      return res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  private generateTokenResponse(user, accessToken) {
    const tokenType = 'Bearer';
    const refreshToken = RefreshToken.generate(user).token;
    const expiresIn = moment().add(variables.jwtExpirationInterval, 'minutes');
    return {
      tokenType, accessToken, refreshToken, expiresIn,
    };
  }

}


const authRoutes: AuthRouter = new AuthRouter();

export default authRoutes.router;