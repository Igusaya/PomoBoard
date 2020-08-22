import React, { FC } from 'react';

import './App.css';
import Timer from '../containers/Timer';
import SettingComponent from './Setting';

const AppComponent: FC = () => (
  <>
    <SettingComponent />
    <Timer />
  </>
);

export default AppComponent;
