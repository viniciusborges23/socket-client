import { IconButton, TextField } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Send as SendIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React, { Dispatch, SetStateAction, useState } from 'react';
import shortid from 'shortid';
import useUser from '../../store/hooks/useUser';
import Message from '../../types/Message';

interface Props {
  setMessageList: Dispatch<SetStateAction<Message[]>>;
}

const useStyles = makeStyles(({
  input: {
    width: '100%'
  },
  sendButton: {
    borderRadius: '5%',
  },
  active: {
    color: green[700],
    '&:hover': {
      backgroundColor: green[50],
    }
  },
}));

export default function Input({ setMessageList }: Props) {
  const classes = useStyles();
  const { user } = useUser();
  const [message, setMessage] = useState('');
  
  const sendMessage = (message: string) => {
    const messageObj = {
      user, 
      message, 
      id: shortid(), 
      date: Date.now()
    }

    setMessageList((list) => [...list, messageObj]);
    setMessage('');
  };

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && message) {
      sendMessage(message);
    }
  };

  return (
    <TextField
      className={classes.input}
      variant="outlined"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      InputProps={{
        endAdornment: (
          <IconButton 
            type="button" 
            disabled={!Boolean(message)}
            className={clsx(classes.sendButton, Boolean(message) && classes.active)}
            onClick={handleSendMessage}
          >
            <SendIcon />
          </IconButton>
        )
      }}
    />
  )
}