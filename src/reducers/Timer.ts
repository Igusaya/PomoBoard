import { Reducer } from 'redux';
import { TimerAction, TimerActionType } from '../actions/Timer';

export interface TimerState {
  index: number;
}

export const initialState: TimerState = {
  index: 0,
};

const timerReducer: Reducer<TimerState, TimerAction> = (
  state: TimerState = initialState,
  action: TimerAction,
): TimerState => {
  switch (action.type) {
    case TimerActionType.ADD_INDEX:
      return {
        ...state,
        index: action.cycleIndex,
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action.type;

      return state;
    }
  }
};

export default timerReducer;
