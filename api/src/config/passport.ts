import * as passportJwt from 'passport-jwt';
import * as BearerStrategy from 'passport-http-bearer';
import { variables } from './variables';
import * as providers from '../services/providers';
import User from '../models/user.model';

const JwtStrategy = passportJwt.Strategy;

export const jwt = new JwtStrategy(
  {
    secretOrKey: variables.jwtSecret,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
});

const oAuth = service => async (token, done) => {
  try {
    const userData = await providers[service](token);
    const user = await User.oAuthLogin(userData);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

export const facebookStrategy = new BearerStrategy(oAuth('facebook'));
export const googleStrategy = new BearerStrategy(oAuth('google'));
