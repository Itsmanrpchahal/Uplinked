import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { SHIFT_ID } from '../utils/constants';
import { useNetInfo } from '@react-native-community/netinfo';
import { store } from '../store';
import { ActionType_OfflineQR } from '../store/offlineQR/actions-types';

type NetworkStateProps = {};
// @ts-ignore
export const NetworkStateView: React.FC<NetworkStateProps> = ({}) => {
    const state = store.getState();
    const [isClear, setIsClear] = useState(true);
    const [scannedData, setScannedData] = useState<any>();
    const [shiftID, setShiftID] = useState<any>();
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { offlineListData, loading_offline } = useTypedSelector(
        (state) => state.offlineListData,
    );
    const netInfo = useNetInfo();
    const { setScannedCheckPointsEntries, getShiftsCheckPointsEntries } =
        useActions();
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, -1);
    useEffect(() => {
        AsyncStorage.getItem(SHIFT_ID).then((resp) => {
            if (resp) {
                setIsClear(false);
            }
        });
    }, [isClear]);

    return (
        <View>
            {/* {!isClear && ( */}
            <Notification>
                {/* <MessageText fontSize={fontSizeState}>
                    Internet Avaliable
                </MessageText> */}
                <TouchableOpacity
                    onPress={async () => {
                        const scannedObject = await AsyncStorage.getItem(
                            'SCANNED_ITEM',
                        );
                        if (scannedObject) {
                            setScannedData(scannedObject);
                            const shiftIDData = await AsyncStorage.getItem(
                                SHIFT_ID,
                            );
                        }

                        //ToD0
                        await AsyncStorage.setItem('SCANNED_ITEM', '');
                        await AsyncStorage.setItem(SHIFT_ID, '');
                        setIsClear(true);
                    }}
                    style={{ marginLeft: 'auto' }}>
                    <CtaBtn fontSize={fontSizeState}>Upload Now</CtaBtn>
                </TouchableOpacity>
            </Notification>
        </View>
    );
};

type FontSizeProps = {
    fontSize: number;
};

const Notification = styled.View`
    padding: 10px 15px;
    flex-direction: row;
    background-color: ${({ theme }: any) => theme.colors.parrotGreen};
    bottom: 0px;
    margin-top: 2px;
    left: 0px;
    width: 100%;
`;
const MessageText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    color: ${({ theme }: any) => theme.colors.text};
    font-weight: 500;
`;
const CtaBtn = styled.Text<FontSizeProps>`
    margin-left: auto;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    color: ${({ theme }: any) => theme.colors.text};
    font-weight: 500;
`;
