import React, { useState } from 'react';
import shortid from 'shortid';
import User from '../../types/User';

interface UserContext {
  // user: User | undefined;
  // setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>
}

export const UserContext = React.createContext<UserContext>({
  // user: undefined,
  // TODO: remove user - debug
  user: {
    name: `User-${shortid()}`,
    id: shortid(),
  }, 
  setUser: () => {}
});

const UserProvider = (props: any) => {
  // TODO: remove user - debug
  const [user, setUser] = useState<User>({
    id: shortid(),
    name: `User-${shortid()}`,
  })

  console.log('user', user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;
