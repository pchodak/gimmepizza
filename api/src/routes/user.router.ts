import { Router, Request, Response } from 'express';
import * as validate from 'express-validation';
import * as httpStatus from 'http-status';
import User from '../models/user.model';
import {
  listUsers,
  createUser,
  replaceUser,
  updateUser,
} from '../utils/user.validation';
import { authorize, ADMIN, LOGGED_USER } from '../middlewares/auth';

export class UserRouter {
  router: Router
  constructor() {
    this.router = Router();
    this.init();
  }
  
  init() {
    this.router.get('/', authorize(), this.getAll);
    this.router.get('/profile', authorize(), this.getUser);
    // this.router.post('/', this.createUser);
    this.router.get('/:userId', this.getOne);
  }

  // get all users
  public async getAll(req: Request, res: Response) {
    try {
      const users = await User.find().select('name email friends friendRequests picture')
      const transformedUsers = users.filter(user => {
        if(JSON.stringify(user._id) !== JSON.stringify(req.user._id)){
          return user.transform();
        }
      });
      res.json(transformedUsers);
    } catch (error) {
      res.json(error);
    }
  }

  // public async createUser(req: Request, res: Response) {
  //   try {
  //     const user = new User(req.body);
  //     const savedUser = await user.save();
  //     res.status(httpStatus.CREATED);
  //     res.json(savedUser.transform());
  //   } catch (error) {
  //     res.status(400).json(User.checkDuplicateEmail(error));
  //   }
  // }

  // get user by id
  public async getOne(req: Request, res: Response) {
    try {
      const user = await User.find({ _id: req.params.userId }).select('name email friends friendRequests')
      // const transformedUsers = users.filter(user => {
      //   if(JSON.stringify(user._id) !== JSON.stringify(req.user._id)){
      //     return user.transform();
      //   }
      // });
      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  public getUser(req: Request, res: Response) {
    res.json(req.user.transform());
  }

}


const userRoutes: UserRouter = new UserRouter();

export default userRoutes.router;