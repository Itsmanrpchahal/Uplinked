import React from "react";
import {
    SkypeIndicator,
} from 'react-native-indicators';
import { useTypedSelector } from '../hooks/useTypedSelector';
//@ts-ignore
import styled from "styled-components/native";


const AppLoader = () => {
    const { modeState } = useTypedSelector(
        (state) => state.mode,
    );
    return (
        <MainParentWrapper >
            <OverLay background={modeState === true ? '#000' : '#fff'}></OverLay>
            <SkypeIndicator color={modeState === true ? "white" : 'black'}></SkypeIndicator>
        </MainParentWrapper>
    );
}


export default AppLoader;

type ModeProps = {
    background: string;
};

const MainParentWrapper = styled.View`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:99;
`;
const OverLay = styled.View<ModeProps>`
    background:${({ background }: any) => background};
    opacity:.5;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
`;