import React, { FC, useState, useRef, useEffect } from 'react';

import TimerComponent from '../components/Timer';

// const cycle = [1500, 300, 1500, 300, 1500, 300, 1500, 900, 900];
const cycle = [
  { time: 1500, type: 'WORK', msg: '25分間、作業を行いましょう' },
  { time: 300, type: 'BREAK', msg: '5分間の休憩を取りましょう' },
  { time: 1500, type: 'WORK', msg: '25分間、作業を行いましょう' },
  { time: 300, type: 'BREAK', msg: '5分間の休憩を取りましょう' },
  { time: 1500, type: 'WORK', msg: '25分間、作業を行いましょう' },
  { time: 300, type: 'BREAK', msg: '5分間の休憩を取りましょう' },
  { time: 1500, type: 'WORK', msg: '25分間、作業を行いましょう' },
  { time: 900, type: 'REST', msg: '15分から30分間の休憩に入りましょう' },
  {
    time: 900,
    type: 'BUFFER_REST',
    msg: '今から15分後までに作業を再開しましょう',
  },
];

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

const useTimer = (): [number, () => void, () => void, () => void, string] => {
  const [timerId, setTimerId] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(cycle[cycleIndex].time);
  const [notificationSupportFlg, setNotificationSupportFlg] = useState(false);
  const [cycleType, setCycleType] = useState('STOP');

  const refCycleIndex = useRef(cycleIndex);

  const showNotification = (message: string) => {
    if (notificationSupportFlg) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const n = new Notification(message);
    }
  };

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

  const tick = () => {
    setTimeLeft(prevTime => {
      if (prevTime === 0) {
        setCycleIndex((refCycleIndex.current + 1) % cycle.length);
        aram.play();
        showNotification(cycle[(refCycleIndex.current + 1) % cycle.length].msg);
        setCycleType(cycle[(refCycleIndex.current + 1) % cycle.length].type);

        return cycle[(refCycleIndex.current + 1) % cycle.length].time;
      }
      document.title = `${`00${Math.floor((prevTime - 1) / 60)}`.slice(
        -2,
      )}:${`00${(prevTime - 1) % 60}`.slice(-2)} \n [${
        cycle[refCycleIndex.current % cycle.length].type
      }]`;

      return prevTime - 1;
    });
  };

  const start = () => {
    setCycleType(cycle[cycleIndex].type);
    const id = setInterval(tick, 1000);
    if (typeof id === 'number') setTimerId(id);
  };

  const reset = () => {
    setTimeLeft(cycle[cycleIndex].time);
  };

  const stop = () => {
    clearInterval(timerId);
    setCycleType('STOP');
  };

  return [timeLeft, reset, start, stop, cycleType];
};

const TimerContainer: FC = () => {
  const [timeLeft, reset, start, stop, phase] = useTimer();

  return (
    <TimerComponent
      timeLeft={timeLeft}
      reset={reset}
      start={start}
      stop={stop}
      phase={phase}
    />
  );
};

export default TimerContainer;
