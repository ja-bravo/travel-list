import tripsBackend from '../../backends/tripsBackend';

export default {
  getTrips: (parent, {}, { user }) => {
    return tripsBackend.getTrips(user);
  },
  getTrip: (parent, { tripID }, { user }) => {
    return tripsBackend.getTrip(tripID);
  },
  getDestinations: (parent, { tripID }, { user }) => {
    return tripsBackend.getDestinations(tripID);
  },
};
