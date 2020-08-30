import React, { FC } from 'react';

import { makeStyles, Container } from '@material-ui/core';
import Timer from '../containers/Timer';
import TimeLine from '../containers/TimeLine';

const useStyles = makeStyles({
  h1: {
    color: '#555',
  },
});

const AppComponent: FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false}>
      <header>
        <h1 className={classes.h1}>Pomo Board</h1>
      </header>
      <Timer />
      <TimeLine />
    </Container>
  );
};

export default AppComponent;
