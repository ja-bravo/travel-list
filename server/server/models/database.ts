import bcrypt from 'bcryptjs';
import * as path from 'path';
import SequelizeStatic from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import Umzug from 'umzug';
import { Environment } from '../utils/environment';
import Destination from './destination.model';
import Trip from './trip.model';
import User from './user.model';

export interface ISequelizeModels {
  User: typeof User;
  Trip: typeof Trip;
  Destination: typeof Destination;
}

class Database {
  private mSequelize: Sequelize;

  constructor() {
    try {
      this.connectAndSync();
    } catch (e) {
      console.error('DB Not started yet');
      console.error(e);
      setTimeout(() => {
        this.connectAndSync();
      }, 8000);
    }
  }

  public getModels() {
    return (this.mSequelize.models as any) as ISequelizeModels;
  }

  public getSequelize() {
    return this.mSequelize;
  }

  private connectAndSync() {
    try {
      this.mSequelize = new Sequelize(Environment.dbName!, Environment.dbUser!, Environment.dbPass!, {
        dialect: 'sqlite',
        storage: path.resolve(Environment.isProd ? '/usr/app/database/database.db' : './database.db'),
        logging: (message: string) => console.log(message),
        modelPaths: [`${__dirname}*/*.model.ts`, `${__dirname}*/*.model.js`],
      });
      this.sync();
    } catch (e) {
      console.log(e);
    }
  }

  private sync() {
    this.mSequelize.sync().then(async () => {
      await this.runMigrations();
      if ((await this.getModels().User.count()) === 0) {
        await models.User.create({
          name: 'Jose Bravo',
          email: Environment.isProd ? 'ja.bravo.isidro@gmail.com' : 'test',
          password: bcrypt.hashSync(Environment.isProd ? '9YJ5u1K6v' : '1234'),
        });
      }

      if (!Environment.isProd && (await this.getModels().Trip.count()) === 0) {
        await this.createDefaultValues();
      }
    });
  }

  private async runMigrations() {
    const umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize,
      },
      migrations: {
        params: [sequelize.getQueryInterface(), SequelizeStatic],
        path: path.join(__dirname, '../migrations'),
      },
    });
    return umzug.up();
  }

  private async createDefaultValues() {
    const user = await models.User.findOne({ where: { email: 'test' } });
    if (user) {
      const trip = await models.Trip.create({ name: 'Trip to Europe', userID: user.id });
      await models.Destination.create({
        name: 'Rome',
        startDate: '2020-01-01',
        endDate: '2020-01-10',
        tripID: trip.id,
        todoItems: JSON.stringify([
          { name: 'See the col', completed: true },
          { name: 'Some other stuff', completed: false },
        ]),
        image:
          'https://images.unsplash.com/photo-1503970999490-4404449dc349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1569&q=80',
      });
      await models.Destination.create({
        name: 'Paris',
        startDate: '2020-01-11',
        endDate: '2020-01-25',
        tripID: trip.id,
        image:
          'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80',
      });
      await models.Destination.create({
        name: 'Amsterdam',
        startDate: '2020-01-26',
        endDate: '2020-01-31',
        tripID: trip.id,
        image:
          'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      });

      const trip2 = await models.Trip.create({ name: 'Prague', userID: user.id });
      await models.Destination.create({
        name: 'Prague',
        startDate: '2020-03-10',
        endDate: '2020-03-12',
        tripID: trip2.id,
        todoItems: JSON.stringify([
          { name: 'Eat a few thousands Trdelniks', completed: false },
          { name: 'Go and see that cool astronomical clock in the square', completed: true },
        ]),
        image:
          'https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      });
    }
  }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
export const db = database;
