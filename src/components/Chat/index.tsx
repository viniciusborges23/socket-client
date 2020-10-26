import { Avatar,  List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { format } from 'date-fns';
import AlwaysScrollToBottom from '../AlwaysScrollToBottom';
import Message from '../../types/Message';
import Input from './Input';

const useStyles = makeStyles((theme: Theme) => ({
  messageListItem: {
    padding: 0
  },
  messageTime: {
    color: grey[500],
    paddingLeft: theme.spacing(1),
  },
  chat: {
    flexGrow: 3,
  },
  chatWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: `calc(100vh - ${theme.spacing(9) + 1}px)`,
    padding: theme.spacing(3),
    paddingTop: theme.spacing(0),
  },
  chatList: {
    overflow: 'auto',
  },
  title: {
    borderBottom: `solid 1px ${grey[300]}`,
    padding: theme.spacing(3),
    lineHeight: 0,
  },
  input: {
    width: '100%'
  },
  avatar: {
    borderRadius: '10%',
    marginRight: theme.spacing(1)
  }
}));

interface Props {
  activeChannel: string;
}

export default function Chat({ activeChannel }: Props) {
  const classes = useStyles();
  const [messageList, setMessageList] = useState<Message[]>([]);
  
  return (
    <div className={classes.chat}>
      <Typography className={classes.title}>
        # channel 1
      </Typography>

      <div className={classes.chatWrapper}>
        <List className={classes.chatList}>
          {messageList.map(({id, user, date, message}) => (
            <ListItem className={classes.messageListItem} key={id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar className={classes.avatar} alt={user?.name} src="" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography>
                    {user}
                    <Typography component="span" variant="caption" className={classes.messageTime}>{format(date, 'h:mm a')}</Typography>
                  </Typography>
                }
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                  >
                    {message}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          <AlwaysScrollToBottom />
        </List>

        <Input setMessageList={setMessageList} />
      </div>
    </div>
  )
}