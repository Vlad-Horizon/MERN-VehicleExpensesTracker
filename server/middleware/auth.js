import jwt from 'jsonwebtoken';
import {jwtConfig} from '../config/config.js';
import {errorCodes} from '../error/codes.js';
import authMiddlewareErrors from '../error/errors/authMiddlewareErrors.js';
import userServices from '../services/userServices.js';

const {access, refresh} = jwtConfig;

// ----------------------------------------------------------------------

export default async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');
    if (!accessToken) throw (errorCodes.middleware.auth.noToken);

    const accessTokenReplace = accessToken.replace('Bearer ', '');
    if (!accessTokenReplace.trim()) throw (errorCodes.middleware.auth.noToken);
  
    const payload = jwt.verify(accessTokenReplace, access.key);
    const { userId, refreshId } = payload;
    if (!userId || !refreshId) throw (errorCodes.middleware.auth.noDate);
    if (payload.type !== 'access') throw (errorCodes.middleware.auth.invalidTokenType);

    const user = await userServices.findUserById(userId);
    if (!user) throw (errorCodes.middleware.auth.userNotFound);

    const refreshTokenInDb = user.tokens.find(token => token._id.toString() === refreshId);
    if (!refreshTokenInDb) throw (errorCodes.middleware.auth.tokenNotFound);
    
    const payloadRefreshToken = jwt.verify(refreshTokenInDb.token, refresh.key);
    
    req.middlewareAccessToken = payload;
    next();

  } catch (e) {
    authMiddlewareErrors(e, res, 'authMiddleware');
  }
}