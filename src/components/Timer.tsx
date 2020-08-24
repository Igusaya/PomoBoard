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
import SettingComponent from './Setting';

export interface TimerProps {
  timeLeft: number;
  reset: () => void;
  start: () => void;
  stop: () => void;
  phase: string;
  open: boolean;
  handleClose: () => void;
  handleClickSetting: () => void;
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
}) => {
  const classes = useStyles();

  return (
    <>
      <SettingComponent open={open} onClose={handleClose} />
      <div className="container">
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
