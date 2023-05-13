// Moduls
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// var
import {jwtConfig, regex} from '../config/config.js';
import {errorCodes} from '../error/codes.js';
import authErrors from '../error/errors/authErrors.js';
import {checkAndValidation} from '../validations/validations.js';
import userServices from '../services/userServices.js';

// ----------------------------------------------------------------------

export const Registration = async (req, res) => {
  try {
    const { userName = '', password = '' } = req.body;
    
    checkAndValidation({
      errorCheck: errorCodes.controllers.authorization.registration.noData,
      errorValid: errorCodes.controllers.authorization.registration.invalidData,
      data: {
        string: [
          [userName, regex.userName],
          [password, regex.password],
        ],
      }
    });
    
    const user = await userServices.findUser({userName});
    if (user) throw (errorCodes.controllers.authorization.registration.nameExist);

    const newUser = await userServices.addUser({
      userName: userName, 
      password: bcrypt.hashSync(password, 10),
    });

    res.status(200).json({message: 'user is registered'});

  } catch (e) {
    authErrors(e, res, 'Registration');
  }
}

// ----------------------------------------------------------------------

export const Login = async (req, res) => {
  try {
    const { userName = '', password = '' } = req.body;

    checkAndValidation({
      errorCheck: errorCodes.controllers.authorization.login.noData,
      errorValid: errorCodes.controllers.authorization.login.invalidData,
      data: {
        string: [
          [userName, regex.userName],
          [password, regex.password],
        ],
      }
    });

    const user = await userServices.findUser({userName});
    if (!user) throw (errorCodes.controllers.authorization.login.errorUser);
    
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw (errorCodes.controllers.authorization.login.errorPass);

    const refreshToken = jwt.sign(
      {userId: user._id, userName: user.userName, type: jwtConfig.refresh.type}, 
      jwtConfig.refresh.key, 
      {expiresIn: jwtConfig.refresh.exp}
    );

    const newRefreshTokenId = await userServices.updateUserRefreshToken({userId: user._id, refreshToken});

    const accessToken = jwt.sign(
      {userId: user._id, userName: user.userName, refreshId: newRefreshTokenId, type: jwtConfig.access.type}, 
      jwtConfig.access.key,
      {expiresIn: jwtConfig.access.exp}
    );

    res.status(200).json({ accessToken, refreshToken });

  } catch (e) {
    authErrors(e, res, 'Login');
  }
}

// ----------------------------------------------------------------------

export const Refresh = async (req, res) => {
  try {
    const { refreshToken = '' } = req.body;

    if (!refreshToken.trim()) {
      throw (errorCodes.controllers.authorization.refresh.noData);
    }

    const decoded = jwt.verify(refreshToken, jwtConfig.refresh.key);
    if (decoded.type !== jwtConfig.refresh.type) throw (errorCodes.controllers.authorization.refresh.invalidTokenType);

    const user = await userServices.findUser({ _id: decoded.userId, 'tokens.token': refreshToken });
    if (!user) throw (errorCodes.controllers.authorization.refresh.userNotFound);

    const refreshTokenInDb = user.tokens.find(token => token.token === refreshToken);

    const accessToken = jwt.sign(
      {userId: decoded.userId, userName: decoded.userName, refreshId: refreshTokenInDb._id, type: jwtConfig.access.type},
      jwtConfig.access.key,
      { expiresIn: jwtConfig.access.exp }
    );

    res.status(200).json({accessToken});

  } catch (e) {
    authErrors(e, res, 'Refresh');
  }
}

// ----------------------------------------------------------------------

export const Logout = async (req, res) => {
  try {
    const {userId, refreshId} = req.middlewareAccessToken;

    checkAndValidation({
      errorCheck: errorCodes.controllers.authorization.logout.noData,
      errorValid: errorCodes.controllers.authorization.logout.invalidData,
      data: {
        string: [
          [userId, regex.mongoId],
          [refreshId, regex.mongoId],
        ],
      }
    });

    const user = await userServices.deleteToken(userId, refreshId);
    res.status(200).json({ message: 'Logout successful!' });

  } catch (e) {
    authErrors(e, res, 'Logout');
  }
}

// ----------------------------------------------------------------------

export const MyAccount = async (req, res) => {
  try {
    const {userId} = req.middlewareAccessToken;
    const user = await userServices.findUserById(userId);

    res.status(200).json({
      userName: user.userName,
    });

  } catch (e) {
    authErrors(e, res, 'MyAccount');
  }
}

// ----------------------------------------------------------------------