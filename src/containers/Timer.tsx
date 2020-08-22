import React, { FC, useState, useRef, useEffect } from 'react';

import TimerComponent from '../components/Timer';

const cycle = [1500, 300, 1500, 300, 1500, 300, 1500, 900, 900];
// const cycle = [25, 5, 25, 5, 25, 5, 25, 5, 15, 15];
const workTimes = [0, 2, 4, 6];
const minBreakTime = 7;
const maxBreakTime = 8;
const aram = new Audio('../../tin2.mp3');
const phaseType = ['WORK', 'BREAK', 'REST', 'BUFFER_REST', 'STOP'];

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
  const [timeLeft, setTimeLeft] = useState(cycle[cycleIndex]);
  const [phase, setPhase] = useState(phaseType[4]);
  const [notificationSupportFlg, setNotificationSupportFlg] = useState(false);

  const refCycleIndex = useRef(cycleIndex);

  const showNotification = (message: string) => {
    if (notificationSupportFlg) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const n = new Notification(message);
    }
  };

  useEffect(() => {
    if (window.Notification && Notification.permission === 'granted') {
      setNotificationSupportFlg(true);
    } else if (isNewNotificationSupported()) {
      Notification.requestPermission().then(result => {
        if (result === 'granted') setNotificationSupportFlg(true);
      });
    }
  }, []);

  useEffect(() => {
    refCycleIndex.current = cycleIndex;
  }, [cycleIndex]);

  const tick = () => {
    setTimeLeft(prevTime => {
      if (prevTime === 0) {
        setCycleIndex(refCycleIndex.current + 1);

        aram.play();
        if (workTimes.includes((refCycleIndex.current + 1) % cycle.length)) {
          showNotification('25分間、作業を行いましょう');
          setPhase(phaseType[0]);
        } else if (
          minBreakTime ===
          (refCycleIndex.current + 1) % cycle.length
        ) {
          showNotification('15分から30分間の休憩に入りましょう');
          setPhase(phaseType[2]);
        } else if (
          maxBreakTime ===
          (refCycleIndex.current + 1) % cycle.length
        ) {
          showNotification('今から15分後までに作業を再開しましょう');
          setPhase(phaseType[3]);
        } else {
          showNotification('5分間の休憩を取りましょう');
          setPhase(phaseType[1]);
        }

        return cycle[(refCycleIndex.current + 1) % cycle.length];
      }
      document.title = `${`00${Math.floor((prevTime - 1) / 60)}`.slice(
        -2,
      )}:${`00${(prevTime - 1) % 60}`.slice(-2)}`;

      return prevTime - 1;
    });
  };

  const reset = () => {
    setTimeLeft(cycle[cycleIndex]);
  };

  const start = () => {
    const id = setInterval(tick, 1000);
    if (typeof id === 'number') setTimerId(id);
    setPhase(phaseType[0]);
  };

  const stop = () => {
    clearInterval(timerId);
    setPhase(phaseType[4]);
  };

  return [timeLeft, reset, start, stop, phase];
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
