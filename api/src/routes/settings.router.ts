import { Router, Request, Response } from 'express';
import * as httpStatus from 'http-status';
import User from '../models/user.model';
import { authorize, ADMIN, LOGGED_USER } from '../middlewares/auth';

export class SettingsRouter {
  router: Router
  constructor() {
    this.router = Router();
    this.init();
  }
  
  init() {
    this.router.put('/image', authorize(), this.saveImage);
  }

  // save Image
  public async saveImage(req: Request, res: Response) {
    try {
      if(req.body.picture) {
        let user = await User.update(
          { _id: req.user._id },
          { picture: req.body.picture }
        );
        res.json(user);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }

}

export default new SettingsRouter().router;