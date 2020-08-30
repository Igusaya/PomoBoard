import React, { FC, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TimerComponent from '../components/Timer';
import { State } from '../reducers';
import { setIndex as setIndexAct } from '../actions/Timer';

const aram = new Audio('../../tin2.mp3');

const isNewNotificationSupported = () => {
  if (!window.Notification === !Notification.requestPermission()) return false;
  if (Notification.permission === 'granted') throw new Error('');
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const e = new Notification('');
  } catch (e) {
    if (e.name === 'TypeError') return false;
  }

  return true;
};

export interface TimerProps {
  cycle: { time: number; type: string; msg: string }[];
  cycleIndex: number;
  setIndex: (index: number) => void;
}

const TimerContainer: FC<TimerProps> = ({ cycle, cycleIndex, setIndex }) => {
  const [timerId, setTimerId] = useState(0);
  const [timeLeft, setTimeLeft] = useState(cycle[cycleIndex].time);
  const [notificationSupportFlg, setNotificationSupportFlg] = useState(false);
  const [cycleType, setCycleType] = useState('STOP');
  const [open, SetOpen] = useState(false);

  const refCycleIndex = useRef(cycleIndex);

  // Notification setting
  useEffect(() => {
    if (window.Notification && Notification.permission === 'granted') {
      setNotificationSupportFlg(true);
    } else if (isNewNotificationSupported()) {
      Notification.requestPermission().then(result => {
        if (result === 'granted') setNotificationSupportFlg(true);
      });
    }
  }, []);

  // cycle index seting
  useEffect(() => {
    refCycleIndex.current = cycleIndex;
  }, [cycleIndex]);

  const showNotification = (message: string) => {
    if (notificationSupportFlg) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const n = new Notification(message);
    }
  };

  const tick = () => {
    setTimeLeft(prevTime => {
      if (prevTime === 0) {
        setIndex((refCycleIndex.current + 1) % cycle.length);
        aram.play();
        showNotification(cycle[(refCycleIndex.current + 1) % cycle.length].msg);
        setCycleType(cycle[(refCycleIndex.current + 1) % cycle.length].type);

        return cycle[(refCycleIndex.current + 1) % cycle.length].time;
      }
      document.title = `${`00${Math.floor((prevTime - 1) / 60)}`.slice(
        -2,
      )}:${`00${(prevTime - 1) % 60}`.slice(-2)} \n [${
        cycle[cycleIndex % cycle.length].type
      }]`;

      return prevTime - 1;
    });
  };

  const start = () => {
    setCycleType(cycle[cycleIndex].type);
    const id = setInterval(tick, 1000);
    if (typeof id === 'number') setTimerId(id);
  };

  const reset = (
    cycleList:
      | { time: number; type: string; msg: string }[]
      | undefined = undefined,
  ) => {
    if (cycleList === undefined || cycleList[cycleIndex] === undefined) {
      setTimeLeft(cycle[cycleIndex].time);

      return;
    }
    setTimeLeft(cycleList[cycleIndex].time);
  };

  const stop = () => {
    clearInterval(timerId);
    setCycleType('STOP');
  };

  const handleClickSetting = () => {
    SetOpen(true);
  };

  const handleClose = () => {
    SetOpen(false);
  };

  return (
    <TimerComponent
      timeLeft={timeLeft}
      reset={reset}
      start={start}
      stop={stop}
      phase={cycleType}
      open={open}
      handleClose={handleClose}
      handleClickSetting={handleClickSetting}
    />
  );
};

const mapStateToProps = (state: State) => {
  return {
    cycle: state.setting.cycle,
    cycleIndex: state.timer.index,
  };
};
interface DispatchProps {
  setIndex: (index: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setIndex: index => dispatch(setIndexAct(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimerContainer);
