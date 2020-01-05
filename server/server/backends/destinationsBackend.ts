import faker from 'faker';
import { GQLDestinationInput, GQLUser } from '../../shared';
import { models } from '../models/database';

class DestinationsBackend {
  public async createOrUpdateDestination(destination: GQLDestinationInput, user: GQLUser) {
    const dest = await models.Destination.findByPk(destination.id);
    if (dest) {
      await models.Destination.update({ ...destination, todoItems: JSON.stringify(destination.todoItems) }, { where: { id: dest.id } });
      return destination;
    } else {
      let tripID = destination.tripID;
      if (!tripID) {
        const trip = await models.Trip.create({
          name: destination.name,
          userID: user.id,
        });
        tripID = trip.id;
      }

      destination.image = destination.image || faker.image.city(1024, 768);
      const res = await models.Destination.create({ ...destination, tripID, todoItems: JSON.stringify(destination.todoItems) });
      return res;
    }
  }
}

const destinationsBackend = new DestinationsBackend();
export default destinationsBackend;
