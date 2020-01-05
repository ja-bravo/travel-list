import destinationsBackend from '../../backends/destinationsBackend';
import tripsBackend from '../../backends/tripsBackend';
import userBackend from '../../backends/userBackend';

export default {
  signIn: (parent, { user }) => {
    user.email = user.email ? user.email.toLowerCase() : '';
    return userBackend.signIn(user.email, user.password);
  },
  rehydrate: (parent, { token }) => {
    return userBackend.rehydrateToken(token);
  },
  register: (parent, { user }) => {
    user.email = user.email ? user.email.toLowerCase() : '';
    return userBackend.register(user);
  },
  createOrUpdateDestination: (p, { destination }, { user }) => {
    return destinationsBackend.createOrUpdateDestination(destination, user);
  },
  createTrip: (p, {}, { user }) => {
    return tripsBackend.createTrip(user);
  },
  updateTrip: (p, { name, id }, { user }) => {
    return tripsBackend.updateTrip(name, id);
  },
};
