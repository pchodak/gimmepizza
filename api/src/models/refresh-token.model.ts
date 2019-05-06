import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as moment from 'moment-timezone';
import { variables } from '../config/variables';

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: 'String',
    ref: 'User',
    required: true,
  },
  expires: { type: Date },
});

refreshTokenSchema.statics = {
  generate(user) {
    const userId = user._id;
    const userEmail = user.email;
    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(variables.jwtExpirationInterval, 'minutes').toDate();
    const tokenObject = new RefreshToken({
      token, userId, userEmail, expires,
    });
    tokenObject.save();
    return tokenObject;
  },

};

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;
