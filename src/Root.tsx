import React from 'react';
import App from './App';
import UserProvider from './store/providers/UserProvider';

function Root() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

export default Root;

// #282A36 column bg
// #44475A active item
// #8BE9FD active item text
// #6272A4 hover item
// #FFFFFF text color
// #50FA7B active presence
// #FF5555 mention badge
// #44475A top nav gb
// #FFFFFF top nav text

