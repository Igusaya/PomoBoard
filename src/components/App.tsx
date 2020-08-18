import React, { FC } from 'react';
import { Button, Card, Icon, Statistic, ButtonGroup } from 'semantic-ui-react';

import './App.css';

interface AppProps {
  timeLeft: number;
  reset: () => void;
  start: () => void;
  stop: () => void;
  phase: string;
}

const AppComponent: FC<AppProps> = ({
  timeLeft,
  reset,
  start,
  stop,
  phase,
}) => (
  <>
    <div className="container">
      <header>
        <h1>ポモドーロ タイマー</h1>
      </header>
      <Card>
        <Statistic className="number-board">
          <Statistic.Label>time</Statistic.Label>
          <Statistic.Value>
            {`00${Math.floor(timeLeft / 60)}`.slice(-2)}:
            {`00${timeLeft % 60}`.slice(-2)}
          </Statistic.Value>
        </Statistic>
        <Card.Content>
          <ButtonGroup fluid>
            <Button color="blue" onClick={start} disabled={phase !== 'STOP'}>
              Start
            </Button>
            <Button color="red" onClick={stop} disabled={phase === 'STOP'}>
              Stop
            </Button>
          </ButtonGroup>
          <Button color="yellow" fluid onClick={reset}>
            <Icon name="redo" />
            Reset
          </Button>
        </Card.Content>
        <Statistic className="number-board">
          <Statistic.Label>phase</Statistic.Label>
          <Statistic.Value>{phase}</Statistic.Value>
        </Statistic>
      </Card>
    </div>
  </>
);

export default AppComponent;
