import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';

export interface TimeLineProps {
  cycle: { time: number; type: string; msg: string }[];
  cycleIndex: number;
}

const useStyles = makeStyles({
  card: {
    marginTop: '7px',
    width: 275,
    background: 'rgba(255, 255, 255, 0.4)',
  },
  stepper: {
    background: 'rgba(255, 255, 255, 0.4)',
  },
});

const TimeLineComponent: FC<TimeLineProps> = ({ cycle, cycleIndex }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title="Time line" />
      <CardContent>
        <Stepper
          activeStep={cycleIndex}
          orientation="vertical"
          className={classes.stepper}
        >
          {cycle.map((label, indexA) => {
            return (
              <Step key={indexA.toString()}>
                <StepLabel>
                  {label.type} - [{label.time / 60}]
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </CardContent>
    </Card>
  );
};

export default TimeLineComponent;
