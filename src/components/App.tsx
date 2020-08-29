import React, { FC } from 'react';

import './App.css';
import { makeStyles } from '@material-ui/core';
import Timer from '../containers/Timer';

const useStyles = makeStyles({
  h1: {
    color: '#555',
  },
});

const AppComponent: FC = () => {
  const classes = useStyles();

  return (
    <>
      <header>
        <h1 className={classes.h1}>Pomo Board</h1>
      </header>
      <Timer />
    </>
  );
};

export default AppComponent;
