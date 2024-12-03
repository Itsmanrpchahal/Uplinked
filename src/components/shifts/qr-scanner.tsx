import React, { useEffect, useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
// @ts-ignore
import styled from 'styled-components/native';
import { getUserLocation } from '@root/utils/common-methods';
import { useActions } from '@root/hooks/useActions';
import { NotFound, NotFoundWrapper } from '../../utils/globalStyle';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SHIFT_ID } from '../../utils/constants';
import { Image, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

type LocationProps = {
    latitude: number;
    longitude: number;
};

const ScanScreen = (props: any) => {
    const { setScannedCheckPointsEntries } = useActions();
    const [location, setLocation] = useState<LocationProps>({
        latitude: 0,
        longitude: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const data = useTypedSelector((state) => state.activeShift);
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const [list, setList] = useState();
    const [torch, setTorch] = useState(true);
    const { putOfflineQR } = useActions();
    const { offlineListData, loading_offline } = useTypedSelector(
        (state) => state.offlineListData,
    );
    var listData = [
        {
            checkpointCode: '',
            scannedDateTime: '',
            geoLocation: {
                latitude: 0,
                longitude: 0,
            },
        },
    ];
    const netInfo = useNetInfo();
    const [accuracy, setAccuracy] = useState({});
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, -1);
    AsyncStorage.getItem('LIST_DATA').then((asyncStorageRes) => {
        // @ts-ignore
        setList(asyncStorageRes);
    });
    useEffect(() => {
        getUserCurrentLocation();
    }, []);

    // useEffect(() => {
    //     offlineListData &&
    //         offlineListData.map((item) => {
    //             offlineData.push(item);
    //         });
    // }, [offlineListData]);

    useEffect(() => {}, []);
    useEffect(() => {
        if (Object.keys(accuracy).length > 0) {
            if (
                accuracy.coords.accuracy > 0 &&
                accuracy.coords.accuracy < 100
            ) {
            } else {
                alert('Please Enable Precise Location');
            }
        }
    }, [accuracy]);

    const getUserCurrentLocation = async () => {
        const data: any = await getUserLocation();
        try {
            setAccuracy(data);
            setLocation({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
            });
            if (Object.keys(data).length > 0) {
                if (data.coords.accuracy > 0 && data.coords.accuracy < 100) {
                    setLoading(false);
                } else {
                    alert('Please Enable Precise Location');
                    props.navigation.goBack();
                }
            } else {
                setLoading(true);
            }
        } catch (e) {
            alert('You need to enable location from your settings!');
            props.navigation.goBack();
        }
        await AsyncStorage.setItem(
            SHIFT_ID,
            data.activeShift.shiftID.toString(),
        );
        setLoading(false);
    };

    const Success = async (e: any) => {
        if (e !== null && Object.keys(e).length > 0) {
            try {
                if (netInfo.isInternetReachable === true) {
                    await setScannedCheckPointsEntries({
                        item: {
                            shiftID: data && data.activeShift.shiftID,
                            checkpointCode: e.data,
                            scannedDateTime: localISOTime,
                            geoLocation: {
                                latitude: location.latitude,
                                longitude: location.longitude,
                            },
                        },
                    });

                    alert('Scanned Success!');
                    props.navigation.goBack();
                } else {
                    putOfflineQR({
                        shiftID: data.activeShift.shiftID.toString(),
                        checkpointCode: e.data,
                        scannedDateTime: localISOTime,
                        geoLocation: {
                            latitude: location.latitude,
                            longitude: location.longitude,
                        },
                    });
                    AsyncStorage.setItem(
                        'SCANNED_ITEM',
                        JSON.stringify({
                            checkpointCode: e.data,
                            scannedDateTime: localISOTime,
                            geoLocation: {
                                latitude: location.latitude,
                                longitude: location.longitude,
                            },
                        }),
                    );
                    await AsyncStorage.setItem(
                        SHIFT_ID,
                        data.activeShift.shiftID.toString(),
                    );

                    alert('Internet unreachable..., Please try again!');
                    props.navigation.goBack();
                }
            } catch (e) {
                alert('Something went wrong, Please try again!');
            }
        }
    };
    return (
        <QRWrapper>
            {loading ? (
                <NotFoundWrapper>
                    <NotFound>Fetching your current location!</NotFound>
                </NotFoundWrapper>
            ) : (
                <BtnView>
                    <QRCodeScanner
                        onRead={Success}
                        flashMode={
                            torch ? 'off' : RNCamera.Constants.FlashMode.torch
                        }
                        reactivate={false}
                        showMarker={true}
                    />
                    <MainView>
                        <BtnClickView>
                            <TouchableOpacity
                                onPress={async () => {
                                    setTorch(!torch);
                                }}>
                                <ImageBtn>
                                    {torch ? (
                                        <Image
                                            source={require('@root/assets/torch/torch.png')}
                                        />
                                    ) : (
                                        <Image
                                            source={require('@root/assets/torchoff/torchoff.png')}></Image>
                                    )}
                                </ImageBtn>
                            </TouchableOpacity>
                        </BtnClickView>
                    </MainView>
                </BtnView>
            )}
        </QRWrapper>
    );
};

export default ScanScreen;

const BtnClickView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 250px;
`;

const ImageBtn = styled.View``;

const BtnView = styled.View`
    width: 100%;
    height: 100%;
`;

const MainView = styled.View`
    width: 100%;
    height: 100%;
`;

const QRWrapper = styled.View`
    height: 100%;
    width: 100%;
`;
