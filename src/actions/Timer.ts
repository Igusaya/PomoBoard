export enum TimerActionType {
  ADD_INDEX = 'TIMER/ADD_INDEX',
}

export interface TimerAction {
  type: TimerActionType;
  cycleIndex: number;
}

export const setIndex = (cycleIndex: number): TimerAction => {
  return { cycleIndex, type: TimerActionType.ADD_INDEX };
};
