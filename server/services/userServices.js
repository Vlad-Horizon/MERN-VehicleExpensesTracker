import User from '../models/userModel.js';

class UserServices {
  async findUser(toFindUser) {
    try {
      const user = await User.findOne(toFindUser);
      return user;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async deleteToken(userId, tokenId) {
    try {
      const user = await User.updateOne(
        {_id: userId},
        {$pull: {tokens: { _id: tokenId}}}
      );
      return user;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async findUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async addUser(user) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async updateUserRefreshToken(props) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {_id: props.userId},
        {$push: { 
          tokens: {
            access: 'auth',
            token: props.refreshToken,
          }
        }},
        {new: true, projection: {tokens: {$slice: -1}}}
      );
      const newRefreshTokenId = updatedUser.tokens[0]._id;
      return newRefreshTokenId;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }
}

export default new UserServices();