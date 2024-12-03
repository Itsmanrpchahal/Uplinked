import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { BallIndicator } from 'react-native-indicators';

const AppLoader = () => {
  return (
    <ActivityIndi>
      <ActivityCont>
        <ActivityIndicator size="large" color="#F18122" />
      </ActivityCont>
    </ActivityIndi>
  );
};

export default AppLoader;

const ActivityIndi = styled.View`
  position: absolute;
  z-index: 99999999;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ActivityCont = styled.View`
  border: 1px solid #f18122;
  border-radius: 8px;
  padding: 20px 17px 17px 20px;
`;
