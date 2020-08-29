export enum SettingActionType {
  SUBMIT = 'SETTING/SUBMIT',
}

export interface SettingAction {
  type: SettingActionType;
  cycle: { time: number; type: string; msg: string }[];
}

export const submit = (
  cycle: { time: number; type: string; msg: string }[],
): SettingAction => {
  return {
    cycle,
    type: SettingActionType.SUBMIT,
  };
};
