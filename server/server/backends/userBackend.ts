import * as bcrypt from 'bcryptjs';
import { Errors } from '../../shared';
import { models } from '../models/database';
import Error from '../utils/error';
import jwtHelper from '../utils/jwt';

class UserBackend {
  public async signIn(email: string, password: string) {
    const user = (await models.User.findOne({ where: { email } })) as any;
    if (user) {
      const hash = user.password;
      if (bcrypt.compareSync(password, hash!)) {
        user.jwtToken = jwtHelper.encode({ id: user.id, type: 'user' }, '60 days');
        return user;
      } else {
        throw new Error(Error.Errors.incorrectCredentials, 'Incorrect credentials');
      }
    } else {
      throw new Error(Error.Errors.incorrectCredentials, 'Incorrect credentials');
    }
  }

  public async rehydrateToken(token: string) {
    if (!token) throw new Error(Error.Errors.notLogged, 'Not logged');

    const valid = jwtHelper.verify(token);
    if (valid) {
      const user = (await models.User.findByPk(valid.id)) as any;

      if (user) {
        user.jwtToken = jwtHelper.encode({ id: user.id, type: 'user' });
        return user;
      } else {
        throw new Error(Error.Errors.notLogged, 'Not logged');
      }
    } else {
      throw new Error(Error.Errors.notLogged, 'Not logged');
    }
  }

  public async register(user: any) {
    if (!user.email || !user.password) throw new Error(Error.Errors.incorrectRequest, 'Incorrect request');

    const userDB = (await models.User.findOne({ where: { email: user.email } })) as any;
    if (!userDB) {
      const res = (await models.User.create({ ...user, password: bcrypt.hashSync(user.password) })) as any;
      res.jwtToken = jwtHelper.encode({ id: user.id, type: 'user' }, '60 days');
      return res;
    } else {
      throw new Error(Error.Errors.alreadyExists, 'This account already exists');
    }
  }
}

const userBackend = new UserBackend();
export default userBackend;
