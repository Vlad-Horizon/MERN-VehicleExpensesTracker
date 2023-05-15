// Moduls
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// var
import { jwtConfig, regex } from '../config/config.js';
import { errorController } from '../error/errorController.js';
import { validation } from '../validations/validation.js';
import userServices from '../services/userServices.js';

// ----------------------------------------------------------------------

const ControllerName = 'authController';

export const authControllerErrorMessages = {
  Registration: {
    userIsFound: `${ControllerName}.Registration, user already exists`,
  },
  Login: {
    userIsNotFound: `${ControllerName}.Login, user not found`,
    incorectPassword: `${ControllerName}.Login, incorect password`,
  },
  Refresh: {
    emptyToken: `${ControllerName}.Refresh, empty refreshToken`,
    incorectTokenType: `${ControllerName}.Refresh, incorect token type`,
    userIsNotFound: `${ControllerName}.Refresh, user not found`,
  },
};

const errorMessages = authControllerErrorMessages;

// ----------------------------------------------------------------------

export const Registration = async (req, res) => {
  try {
    const { userName = '', password = '' } = req.body;

    validation({
      string: [
        [userName, regex.userName],
        [password, regex.password],
      ],
    });

    const user = await userServices.findUser({ userName });
    if (user) throw new Error(errorMessages.Registration.userIsFound);

    const newUser = await userServices.addUser({
      userName: userName,
      password: bcrypt.hashSync(password, 10),
    });

    res.status(200).json({ message: 'user is registered' });
  } catch (error) {
    errorController({ controllerName: 'authController.Registration', error, res });
  }
};

// ----------------------------------------------------------------------

export const Login = async (req, res) => {
  try {
    const { userName = '', password = '' } = req.body;

    validation({
      string: [
        [userName, regex.userName],
        [password, regex.password],
      ],
    });

    const user = await userServices.findUser({ userName });
    if (!user) throw new Error(errorMessages.Login.userIsNotFound);

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw new Error(errorMessages.Login.incorectPassword);

    const refreshToken = jwt.sign(
      { userId: user._id, userName: user.userName, type: jwtConfig.refresh.type },
      jwtConfig.refresh.key,
      { expiresIn: jwtConfig.refresh.exp }
    );

    const newRefreshTokenId = await userServices.updateUserRefreshToken({ userId: user._id, refreshToken });

    const accessToken = jwt.sign(
      { userId: user._id, userName: user.userName, refreshId: newRefreshTokenId, type: jwtConfig.access.type },
      jwtConfig.access.key,
      { expiresIn: jwtConfig.access.exp }
    );

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    errorController({ controllerName: 'authController.Login', error, res });
  }
};

// ----------------------------------------------------------------------

export const Refresh = async (req, res) => {
  try {
    const { refreshToken = '' } = req.body;

    if (!refreshToken.trim()) throw new Error(errorMessages.Refresh.emptyToken);

    const decoded = jwt.verify(refreshToken, jwtConfig.refresh.key);
    if (decoded.type !== jwtConfig.refresh.type) throw new Error(errorMessages.Refresh.incorectTokenType);

    const user = await userServices.findUser({ _id: decoded.userId, 'tokens.token': refreshToken });
    if (!user) throw new Error(errorMessages.Refresh.userIsNotFound);

    const refreshTokenInDb = user.tokens.find((token) => token.token === refreshToken);

    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
        userName: decoded.userName,
        refreshId: refreshTokenInDb._id,
        type: jwtConfig.access.type,
      },
      jwtConfig.access.key,
      { expiresIn: jwtConfig.access.exp }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    errorController({ controllerName: 'authController.Refresh', error, res });
  }
};

// ----------------------------------------------------------------------

export const Logout = async (req, res) => {
  try {
    const { userId, refreshId } = req.middlewareAccessToken;

    validation({
      string: [
        [userId, regex.mongoId],
        [refreshId, regex.mongoId],
      ],
    });

    const user = await userServices.deleteToken(userId, refreshId);
    res.status(200).json({ message: 'Logout successful!' });
  } catch (error) {
    errorController({ controllerName: 'authController.Logout', error, res });
  }
};

// ----------------------------------------------------------------------

export const MyAccount = async (req, res) => {
  try {
    const { userId } = req.middlewareAccessToken;
    const user = await userServices.findUserById(userId);

    res.status(200).json({
      userName: user.userName,
    });
  } catch (error) {
    errorController({ controllerName: 'authController.MyAccount', error, res });
  }
};

// ----------------------------------------------------------------------
