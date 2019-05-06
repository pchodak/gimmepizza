import { Router, Request, Response } from 'express';
import Order from '../models/order.model';
import { authorize, ADMIN, LOGGED_USER } from '../middlewares/auth';

export class OrderRouter {
  router: Router
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post('/new', authorize(), this._create);
    this.router.get('/', authorize(), this._readAll);
    this.router.get('/:id', authorize(), this._read);
  }

  private async _create(req: Request, res: Response) {
    try {
      if(req.body) {
        const order = await (new Order(req.body)).save();
        return res.json(order);
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  private async _read(req: Request, res: Response) {
    try {
      const order = await Order.findOne({ _id: req.params.id})
        .populate({
          path: 'user',
          select: 'name email'
        });
      return res.status(200).json(order);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  private async _readAll(req: Request, res: Response) {
    try {
      const orders = await Order.find({disabled: false});
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new OrderRouter().router;