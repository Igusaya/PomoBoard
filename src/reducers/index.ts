import { Reducer, combineReducers } from 'redux';

import setting, {
  SettingState,
  initialState as SettingInitialState,
} from './Setting';
import { SettingAction } from '../actions/Setting';
import timer, { TimerState, initialState as TimerInitialState } from './Timer';
import { TimerAction } from '../actions/Timer';

type Action = SettingAction | TimerAction;

export interface State {
  setting: SettingState;
  timer: TimerState;
}

export const initialState: State = {
  setting: SettingInitialState,
  timer: TimerInitialState,
};

const rootReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action,
): State => {
  const intermediateReducer = combineReducers<State>({
    // ここで設定するreducerはstateと名前が一致しないとエラーになる
    setting,
    timer,
  });
  // combinReducerで取りまとめられたstateを取得
  const intermediateState = intermediateReducer(state, action);

  return intermediateState;
};

export default rootReducer;
