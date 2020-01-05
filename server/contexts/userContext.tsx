import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import React, { createContext, useMemo, useState } from 'react';
// import { GQLUser } from '../shared';

interface IState {
  user: any;
  setUser: (user: any | null) => void;
  theme: any;
}

export const UserContext = createContext<IState | null>(null);

const UserProvider = (props: any) => {
  const [user, setUser] = useState<any | null>(null);
  const theme = useMemo(() => {
    return createMuiTheme({
      palette: {
        primary: {
          main: '#5BB27D',
        },
        secondary: {
          main: '#FF4A74',
        },
        error: {
          main: red.A400,
        },
        background: {
          default: '#fafafa',
        },
      },
      overrides: {
        MuiTextField: {
          root: {
            background: 'white',
          },
        },
        MuiListItemText: {
          root: {
            color: '#777777',
          },
        },
      },
    });
  }, [user]);

  return <UserContext.Provider value={{ user, setUser, theme }} {...props} />;
};
export default UserProvider;
