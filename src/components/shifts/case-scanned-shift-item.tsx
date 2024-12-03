import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import { RepositoriesStateResponse } from '@root/store/checkpoints/interfaces';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const CaseScannedShiftItem: React.FC<RepositoriesStateResponse> = ({
    checkpoint,
    scannedDateTime,
}) => {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const d = scannedDateTime != null && scannedDateTime.split('T')[1].split(':')
    const d1 = scannedDateTime != null && scannedDateTime.split('T')[1].split(':')
    return (
        <ItemLayout1>
            <ItemHorizontal>
                <TimeiconScanned
                    source={require('@root/assets/clock/clock.png')}
                />
                <TimeText fontSize={fontSizeState}> { d[0]}{':'}{d[1]}</TimeText>
                <TimeiconScanned
                    source={require('@root/assets/locicon/locicon.png')}
                />
                <TimeText fontSize={fontSizeState}>{ checkpoint.length > 25 ? checkpoint.slice(0,25)+'...' : checkpoint}</TimeText>
            </ItemHorizontal>


        </ItemLayout1>
    );
};

// @ts-ignore
export default withTheme(CaseScannedShiftItem);

type FontSizeProps = {
    fontSize: number;
};

const TimeText = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    
    font-size: ${({ theme,fontSize }: any) => theme.fontSize[fontSize].cardDate};
    margin-left: 7px;
`;

const ItemLayout1 = styled.View`
    background: ${({ theme }: any) => theme.colors.primary};
    border-radius: 8px;
    padding-left: 14px;
    padding-top: 14px;
    padding-bottom: 14px;
    flex-direction: row; 
    align-items: center;
    margin-bottom: 8px;
`;

const ItemHorizontal = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const TimeiconScanned = styled.Image`
    width: 18px;
    height: 18px;
    margin-left: 5px;
`;
