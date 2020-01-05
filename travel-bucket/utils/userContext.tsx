import { createContext, useState } from 'react';
import { GQLUser } from 'travel-bucket-shared';
import React from 'react';

interface IState {
  user: GQLUser;
  setUser: (user: GQLUser | null) => void;
  isPhysio: boolean;
  isClub: boolean;
}

export const UserContext = createContext<IState | null>(null);

const UserProvider = (props: any) => {
  const [user, setUser] = useState<GQLUser | null>(null);

  return <UserContext.Provider value={{ user, setUser }} {...props} />;
};
export default UserProvider;
