import React, { FC } from 'react';
import { connect } from 'react-redux';

import TimeLine, { TimeLineProps } from '../components/TimeLine';
import { State } from '../reducers';

const TimeLineContatiner: FC<TimeLineProps> = (props: TimeLineProps) => {
  const { cycle, cycleIndex } = props;

  return <TimeLine cycle={cycle} cycleIndex={cycleIndex} />;
};

const mapStateToProps = (state: State) => ({
  cycle: state.setting.cycle,
  cycleIndex: state.timer.index,
});

export default connect(mapStateToProps)(TimeLineContatiner);
