import { GQLTrip, GQLUser } from '../../shared';
import { models } from '../models/database';

class TripsBackend {
  public async getTrips(user: GQLUser) {
    if (!user) user = await models.User.findOne({ where: { email: 'test' } });
    const trips = await models.Trip.findAll({ where: { userID: user.id }, include: [models.Destination] });
    return trips.map(t => ({
      ...(t as any).dataValues,
      destinations: t.destinations.map(d => ({ ...(d as any).dataValues, todoItems: JSON.parse(d.todoItems) })),
    }));
  }

  public async getTrip(tripID: string) {
    const trip = await models.Trip.findByPk(tripID, { include: [models.Destination] });
    return {
      ...(trip as any).dataValues,
      destinations: trip.destinations.map(d => ({ ...(d as any).dataValues, todoItems: JSON.parse(d.todoItems) })),
    };
  }

  public async getDestinations(tripID: string) {
    return await models.Destination.findAll({ where: { tripID } });
  }

  public async createTrip(user: GQLUser) {
    return await models.Trip.create({ userID: user.id });
  }

  public async updateTrip(name: string, tripID: string) {
    console.log(name);
    console.log(tripID);
    await models.Trip.update({ name }, { where: { id: tripID } });
    return await models.Trip.findByPk(tripID);
  }
}

const tripsBackend = new TripsBackend();
export default tripsBackend;
