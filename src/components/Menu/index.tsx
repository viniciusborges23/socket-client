import { Collapse, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ExpandMore, ChevronRight } from '@material-ui/icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import clsx from 'clsx';
import channels from '../../data/channels.json';
import useUser from '../../store/hooks/useUser';

type Menu = 'channels' | 'users';

interface Props {
  activeChannel: string;
  setActiveChannel: Dispatch<SetStateAction<string>>;
}

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    flexGrow: 1,
    maxWidth: 360,
    backgroundColor: '#282A36',
    color: '#FFFFFF',
  },
  menuTitle: {
    borderBottom: `solid 1px ${grey[700]}`,
    padding: theme.spacing(3),
    lineHeight: 0,
  },
  menuItemActive: {
    backgroundColor: '#44475A',
    color: '#8BE9FD',
  },
  menuItem: {
    paddingLeft: theme.spacing(5),
    marginRight: -theme.spacing(5),
    '&:hover': {
      backgroundColor: '#6272A4',
    }
  },
}));

export default function Menu({ activeChannel, setActiveChannel }: Props) {
  const classes = useStyles();
  const { user } = useUser();
  const users = [user?.name];
  const [open, setOpen] = useState({channels: true, users: true});

  const handleClick = (menu: Menu) => {
    setOpen((prev) => ({...prev, [menu]: !open[menu]}));
  };

  return (
    <div className={classes.menu}>
      <Typography className={classes.menuTitle}>
        Isléqui
      </Typography>
      <List component="nav">
        <ListItem button onClick={() => handleClick('channels')}>
          {open.channels ? <ExpandMore /> : <ChevronRight />}
          <ListItemText primary="Channels" />
        </ListItem>
        <Collapse in={open.channels} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {channels.map(({id, name}) => (
              <ListItem 
                button 
                key={id} 
                onClick={() => setActiveChannel(id)} 
                className={clsx(classes.menuItem, activeChannel === id && classes.menuItemActive)}
              >
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <List component="nav">
        <ListItem button onClick={() => handleClick('users')}>
          {open.users ? <ExpandMore /> : <ChevronRight />}
          <ListItemText primary="Users" />
        </ListItem>
        <Collapse in={open.users} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {users.map((user) => (
              <ListItem 
                button 
                key={user} 
                className={clsx(classes.menuItem, activeChannel === user && classes.menuItemActive)}
              >
                <ListItemText primary={user} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  )
}