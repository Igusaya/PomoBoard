import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Setting from '../containers/Setting';

export interface TimerProps {
  timeLeft: number;
  reset: () => void;
  start: () => void;
  stop: () => void;
  phase: string;
  open: boolean;
  handleClose: () => void;
  handleClickSetting: () => void;
  next: () => void;
}

const useStyles = makeStyles({
  root: {
    width: 275,
    background: 'rgba(255, 255, 255, 0.4)',
  },
});

const TimerComponent: FC<TimerProps> = ({
  timeLeft,
  reset,
  start,
  stop,
  phase,
  open,
  handleClose,
  handleClickSetting,
  next,
}) => {
  const classes = useStyles();

  return (
    <>
      <Setting open={open} onClose={handleClose} reset={reset} />

      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton onClick={handleClickSetting} aria-label="settings">
              {' '}
              <SettingsIcon />{' '}
            </IconButton>
          }
          title="Pomo Timer"
          subheader={`phase:  ${phase}`}
        />
        <CardContent>
          <Typography variant="h2" component="p" align="center">
            {`00${Math.floor(timeLeft / 60)}`.slice(-2)}:
            {`00${timeLeft % 60}`.slice(-2)}
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup orientation="vertical" fullWidth>
            <Button onClick={start} disabled={phase !== 'STOP'}>
              Start
            </Button>
            <ButtonGroup>
              <Button onClick={reset}>Retry</Button>

              <Button onClick={stop} disabled={phase === 'STOP'}>
                Stop
              </Button>

              <Button onClick={next}>Next</Button>
            </ButtonGroup>
          </ButtonGroup>
        </CardActions>
      </Card>
    </>
  );
};

export default TimerComponent;
