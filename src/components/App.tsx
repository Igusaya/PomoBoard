import React, { FC } from 'react';

import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Timer from '../containers/Timer';
import SettingComponent from './Setting';

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
      <SettingComponent />
      <Timer />
    </>
  );
};

export default AppComponent;
