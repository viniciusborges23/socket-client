import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import Login from './components/Login';
import Menu from './components/Menu';
import useUser from './store/hooks/useUser';

const { REACT_APP_SOCKET_DOMAIN } = process.env;

const useStyles = makeStyles(({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
  }
}));

export enum UserEvent {
  JOIN = 'userJoin',
  LIST = 'userList',
}

function App() {
  const classes = useStyles();
  const { user } = useUser();
  const [activeChannel, setActiveChannel] = useState('1');
  
  useEffect(() => {
    if (user) {
      const socket = io(`${REACT_APP_SOCKET_DOMAIN}`, {
        query: {
          user: JSON.stringify(user)
        }
      });

      socket.on(UserEvent.JOIN, (data: any) => {
        console.log(UserEvent.JOIN, data);
      });

      socket.on(UserEvent.LIST, (data: any) => {
        console.log(UserEvent.LIST, data);
      });
    }
  }, [user]);
  
  if (!user) {
    return <Login />
  }
  
  return (
    <div className={classes.root}>
      <Menu activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
      <Chat activeChannel={activeChannel} />
    </div>
  );
}

export default App;
