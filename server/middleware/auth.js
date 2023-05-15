import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/config.js';
import { errorController } from '../error/errorController.js';
import userServices from '../services/userServices.js';

const { access, refresh } = jwtConfig;

// ----------------------------------------------------------------------

const authMiddlewareName = 'authMiddleware';

export const authMiddlewareErrorMessages = {
  accessToken: `${authMiddlewareName}, accessToken is not found`,
  accessTokenReplace: `${authMiddlewareName}, accessToken is not found (replace)`,
  errorPayload: `${authMiddlewareName}, on data in payload`,
  accessTokenTypeError: `${authMiddlewareName}, error accessToken type`,
  userIsNotFound: `${authMiddlewareName}, user is not found`,
  refreshTokenIsNotFound: `${authMiddlewareName}, refreshToken is not found`,
};

const errorMesages = authMiddlewareErrorMessages;

// ----------------------------------------------------------------------

export default async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');
    if (!accessToken) throw new Error(errorMesages.accessToken);

    const accessTokenReplace = accessToken.replace('Bearer ', '');
    if (!accessTokenReplace.trim()) throw new Error(errorMesages.accessTokenReplace);

    const payload = jwt.verify(accessTokenReplace, access.key);
    const { userId, refreshId } = payload;
    if (!userId || !refreshId) throw new Error(errorMesages.errorPayload);
    if (payload.type !== 'access') throw new Error(errorMesages.accessTokenTypeError);

    const user = await userServices.findUserById(userId);
    if (!user) throw new Error(errorMesages.userIsNotFound);

    const refreshTokenInDb = user.tokens.find((token) => token._id.toString() === refreshId);
    if (!refreshTokenInDb) throw new Error(errorMesages.refreshTokenIsNotFound);

    jwt.verify(refreshTokenInDb.token, refresh.key);

    req.middlewareAccessToken = payload;
    next();
  } catch (error) {
    errorController({ controllerName: 'authMiddleware', error, res });
  }
};
