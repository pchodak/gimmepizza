import * as Joi from 'joi';

// POST /v1/auth/register
export const register = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(128),
    confirmPassword: Joi.string().required().max(128)
  },
}

// POST /v1/auth/login
export const login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required().max(128)
  },
};

// POST /v1/auth/facebook
// POST /v1/auth/google
export const oAuthValidation = {
  body: {
    access_token: Joi.string().required(),
  },
};

// POST /v1/auth/refresh
export const refresh = {
  body: {
    email: Joi.string().email().required(),
    refreshToken: Joi.string().required(),
  },
};
