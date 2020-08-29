import React, { FC } from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import SettingComponent, { CycleType } from '../components/Setting';
import { SettingState } from '../reducers/Setting';
import { submit } from '../actions/Setting';

export interface SettingProps {
  open: boolean;
  onClose: () => void;
  cycle: CycleType[];
  onSubmit: (cycle: CycleType[]) => void;
  reset: () => void;
}

interface DispatchProps {
  onSubmit: (cycle: CycleType[]) => void;
}

const SettingContatiner: FC<SettingProps> = (props: SettingProps) => {
  const { open, onClose, cycle, onSubmit, reset } = props;

  return (
    <SettingComponent
      open={open}
      onClose={onClose}
      cycle={cycle}
      submit={onSubmit}
      onReset={reset}
    />
  );
};

const mapStateToProps = (state: SettingState) => ({
  cycle: state.cycle,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit: cycle => dispatch(submit(cycle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingContatiner);
