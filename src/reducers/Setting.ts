import { Reducer } from 'redux';
import { SettingAction, SettingActionType } from '../actions/Setting';

export interface SettingState {
  cycle: { time: number; type: string; msg: string }[];
}

export const initialState: SettingState = {
  cycle: [
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
      type: 'REST',
      msg: '今から15分後までに作業を再開しましょう',
    },
  ],
};

const settingReducer: Reducer<SettingState, SettingAction> = (
  state: SettingState = initialState,
  action: SettingAction,
): SettingState => {
  switch (action.type) {
    case SettingActionType.SUBMIT:
      return {
        ...state,
        cycle: action.cycle,
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action.type;

      return state;
    }
  }
};

export default settingReducer;
