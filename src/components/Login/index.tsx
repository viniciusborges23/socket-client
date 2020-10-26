import { Button, Dialog, DialogContent, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import shortid from 'shortid';
import useUser from '../../store/hooks/useUser';

const useStyles = makeStyles(({
  dialog: {
    paddingBottom: '20px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

export default function Login() {
  const [name, setName] = useState('');
  const { setUser } = useUser();
  const classes = useStyles();

  const handleClick = () => {
    if (name) {
      setUser({
        name,
        id: shortid(),
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name) {
      setUser({
        name,
        id: shortid(),
      });
    }
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={true}>
      <DialogContent className={classes.dialog}>
        <TextField 
          fullWidth
          value={name}
          onKeyDown={handleKeyDown}
          onChange={(e) => setName(e.target.value)}
          label="Name / Nickname"
          InputLabelProps={{
            shrink: true
          }}
        />
        <Button variant="contained" type="button" color="primary" onClick={handleClick}>
          Join
        </Button>
      </DialogContent>
    </Dialog>
  )
}