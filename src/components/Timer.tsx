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

interface TimerProps {
  timeLeft: number;
  reset: () => void;
  start: () => void;
  stop: () => void;
  phase: string;
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
}) => {
  const classes = useStyles();

  return (
    <>
      <div className="container">
        <Card className={classes.root}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
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
                <Button onClick={stop} disabled={phase === 'STOP'}>
                  Stop
                </Button>
                <Button onClick={reset}>Restart</Button>
              </ButtonGroup>
            </ButtonGroup>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default TimerComponent;
