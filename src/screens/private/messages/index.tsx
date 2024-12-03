import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
} from 'react-native';
// @ts-ignore

import styled from 'styled-components/native';
import { apiUri } from '@root/service/apiEndPoints';

import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { NetworkStateView } from '@root/components/NetworkStateView';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '@root/hooks/useActions';
import AppLoader from '../../../utils/AppLoader';
import { useIsFocused } from '@react-navigation/native';
import navigationStrings from '../../../navigation/navigationStrings';
import { NoInternetView } from '../../../components/NoInternetView';
import { store } from '../../../store';
import { ActionType_Offline_Patrol } from '../../../store/putOfflinePatrolEntry/actions-types';
import { ActionType_Offline_Maintenance } from '../../../store/putOfflineMaintenanceEntry/actions-types';
import { ActionType_OfflineQR } from '../../../store/offlineQR/actions-types';
import { ActionType_Offline_Welfare_Check } from '../../../store/putOfflineWelfareCheckEntry/actions-types';
import { ActionType_Offline_Upload_Attachment } from '../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { navigationRef } from '../../../navigation/RootNavigation';
import { ActionType_Offline_Intoxication } from '../../../store/putOfflineIntoxicationEntry/actions-types';
import { ActionType_Offline_Vehicle_Report } from '../../../store/putOfflineVehicleReportEntry/actions-types';
import { ActionType_Offline_Boat_Report } from '../../../store/putOfflineBoatReportEntry/actions-types';
import { ActionType_Offline_Crowd_Count } from '../../../store/putOfflineCrowdCountEntry/actions-types';
import { ActionType_Offline_Fire_Alarm } from '../../../store/putOfflineFireAlarmEntry/actions-types';

AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
    // @ts-ignore
    setScannedData(asyncStorageRes);
});

export const Messages = (props: any) => {
    const {
        getMessageList,
        setMessageRead,
        createReportEntryForShift,
        addMaintenance,
        addWelfare,
        uploadAttachmentShiftReportsEntries,
        setScannedCheckPointsEntries,
        getShiftsCheckPointsEntries,
        setIntoxication,
        addVehicle,
        setBoatReport,
        setCrowdCount,
        setFireAlarm,
    } = useActions();

    const netInfo = useNetInfo();

    const isFocused = useIsFocused();

    const { orgID } = useTypedSelector((state) => state.auth);

    const { messageListData, messageLoading } = useTypedSelector(
        (state) => state.messageListData,
    );

    const { messageMarkData, messageMarkLoading } = useTypedSelector(
        (state) => state.messageMarkData,
    );
    const { offlineListData, loading_offline } = useTypedSelector(
        (state) => state.offlineListData,
    );

    const {
        offlineUploadAttachmentShiftListData,
        loading_offlineUploadAttachmentShift,
    } = useTypedSelector((state) => state.offlineUploadAttachmentShiftListData);

    const { addMaintainenaceData, addMaintainenaceLoading }: any =
        useTypedSelector((state) => state.addMaintainenaceData);

    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);

    const { offlinePatrolListData, loading_offlinePatrol } = useTypedSelector(
        (state) => state.offlinePatrolListData,
    );

    const { offlineMaintenanceListData, loading_offlineMaintenance } =
        useTypedSelector((state) => state.offlineMaintenanceListData);

    const { offlineWelfareCheckListData, loading_offlineWelfareCheck } =
        useTypedSelector((state) => state.offlineWelfareCheckListData);

    const { offlineIntoxicationListData, loading_offlineIntoxication } =
        useTypedSelector((state) => state.offlineIntoxicationListData);

    const { offlineVehicleReportListData, loading_offlineVehicleReport } =
        useTypedSelector((state) => state.offlineVehicleReportListData);

    const { offlineBoatReportListData, loading_offlineBoatReport } =
        useTypedSelector((state) => state.offlineBoatReportListData);

    const { offlineCrowdCountListData, loading_offlineCrowdCount } =
        useTypedSelector((state) => state.offlineCrowdCountListData);
    const { offlineFireAlarmListData, loading_offlineFireAlarm } =
        useTypedSelector((state) => state.offlineFireAlarmListData);

    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    const [offSet, setOffSet] = useState<number>(1);
    const [scannedData, setScannedData] = useState();
    AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
        // @ts-ignore
        setScannedData(asyncStorageRes);
    });

    useEffect(() => {}, []);

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === null ||
                netInfo.isInternetReachable === true
            ) {
                getMessageList({
                    page: offSet,
                    rows: '100',
                });
            }
        }
    }, [isFocused]);

    /*   Offline QR Code */

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === true &&
                offlineListData.length > 0
            ) {
                offlineListData &&
                    offlineListData.map((data, i) => {
                        setScannedCheckPointsEntries({
                            item: {
                                shiftID: parseInt(data.shiftID),
                                checkpointCode: data.checkpointCode,
                                scannedDateTime: data.scannedDateTime,
                                geoLocation: {
                                    latitude: data.geoLocation.latitude,
                                    longitude: data.geoLocation.longitude,
                                },
                            },
                        });
                        getShiftsCheckPointsEntries({
                            id: parseInt(data.shiftID),
                        });
                    });

                store.dispatch({
                    type: ActionType_OfflineQR.OFFILINE_QR_GET_FAILED,
                });
            }
        }
    }, [isFocused, offlineListData]);

    /* Offline Patrol list data */

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === true &&
                offlinePatrolListData.length > 0
            ) {
                offlinePatrolListData &&
                    offlinePatrolListData.map((data, i) => {
                        createReportEntryForShift({
                            url: apiUri.shifts.createPetrolEntry,
                            type: 'create',
                            create: data,
                        }).then((res) => {
                            if (res.status === 200) {
                                offlinePatrolListData[i].attachment.length >
                                    0 &&
                                    offlinePatrolListData[i].attachment.map(
                                        (data, index) => {
                                            data._parts[1][1] =
                                                res.data.reportID;
                                            uploadAttachmentShiftReportsEntries(
                                                offlinePatrolListData[i]
                                                    .attachment[index],
                                            );
                                        },
                                    );
                            }
                        });
                    });
                store.dispatch({
                    type: ActionType_Offline_Patrol.OFFLINE_PATROL_GET_FAILED,
                });
                store.dispatch({
                    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                });
            }
        }
    }, [isFocused, offlinePatrolListData]);

    /* Offline Maintenance list data */

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === true &&
                offlineMaintenanceListData.length > 0
            ) {
                offlineMaintenanceListData &&
                    offlineMaintenanceListData.map((data, i) => {
                        addMaintenance(data).then((res) => {
                            if (res.status === 200) {
                                offlineMaintenanceListData[i].attachment
                                    .length > 0 &&
                                    offlineMaintenanceListData[
                                        i
                                    ].attachment.map((data, index) => {
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineMaintenanceListData[i]
                                                .attachment[index],
                                        );
                                    });
                            }
                        });
                    });

                store.dispatch({
                    type: ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_GET_FAILED,
                });
                store.dispatch({
                    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                });
            }
        }
    }, [isFocused, offlineMaintenanceListData]);

    /* Offline Welfare check list data */

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === true &&
                offlineWelfareCheckListData.length > 0
            ) {
                offlineWelfareCheckListData &&
                    offlineWelfareCheckListData.map((data, i) => {
                        addWelfare(data).then((res) => {
                            if (res.status === 200) {
                                offlineWelfareCheckListData[i].attachment
                                    .length > 0 &&
                                    offlineWelfareCheckListData[
                                        i
                                    ].attachment.map((data, index) => {
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineWelfareCheckListData[i]
                                                .attachment[index],
                                        );
                                    });
                            }
                        });
                    });

                store.dispatch({
                    type: ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_GET_FAILED,
                });
                store.dispatch({
                    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                });
            }
        }
    }, [isFocused, offlineWelfareCheckListData]);

    /* offline Intoxication  List data  */

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === true &&
                offlineIntoxicationListData.length > 0
            ) {
                offlineIntoxicationListData &&
                    offlineIntoxicationListData.map((data, i) => {
                        setIntoxication(data).then((res) => {
                            if (res.status === 200) {
                                offlineIntoxicationListData[i].attachment
                                    .length > 0 &&
                                    offlineIntoxicationListData[
                                        i
                                    ].attachment.map((data, index) => {
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineIntoxicationListData[i]
                                                .attachment[index],
                                        );
                                    });
                            }
                        });
                    });
                store.dispatch({
                    type: ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_GET_FAILED,
                });
                store.dispatch({
                    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                });
            }
        }
    }, [isFocused, offlineIntoxicationListData]);

    /* offline vehicle report list data*/

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === true &&
                offlineVehicleReportListData.length > 0
            ) {
                offlineVehicleReportListData &&
                    offlineVehicleReportListData.map((data, i) => {
                        addVehicle(data).then((res) => {
                            if (res.status === 200) {
                                offlineVehicleReportListData[i].attachment
                                    .length > 0 &&
                                    offlineVehicleReportListData[
                                        i
                                    ].attachment.map((data, index) => {
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineVehicleReportListData[i]
                                                .attachment[index],
                                        );
                                    });
                            }
                        });
                    });

                store.dispatch({
                    type: ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_GET_FAILED,
                });
                store.dispatch({
                    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                });
            }
        }
    }, [isFocused, offlineVehicleReportListData]);

    /* Offline Boat Report List Data */

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === true &&
                offlineBoatReportListData.length > 0
            ) {
                offlineBoatReportListData &&
                    offlineBoatReportListData.map((data, i) => {
                        setBoatReport(data).then((res) => {
                            if (res.status === 200) {
                                offlineBoatReportListData[i].attachment.length >
                                    0 &&
                                    offlineBoatReportListData[i].attachment.map(
                                        (data, index) => {
                                            data._parts[1][1] =
                                                res.data.reportID;
                                            uploadAttachmentShiftReportsEntries(
                                                offlineBoatReportListData[i]
                                                    .attachment[index],
                                            );
                                        },
                                    );
                            }
                        });
                    });

                store.dispatch({
                    type: ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_GET_FAILED,
                });
                store.dispatch({
                    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                });
            }
        }
    }, [isFocused, offlineBoatReportListData]);

    /* offline  Crowd Count List Data */

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === true &&
                offlineCrowdCountListData.length > 0
            ) {
                offlineCrowdCountListData &&
                    offlineCrowdCountListData.map((data, i) => {
                        setCrowdCount(data).then((res) => {
                            if (res.status === 200) {
                                offlineCrowdCountListData[i].attachment.length >
                                    0 &&
                                    offlineCrowdCountListData[i].attachment.map(
                                        (data, index) => {
                                            data._parts[1][1] =
                                                res.data.reportID;
                                            uploadAttachmentShiftReportsEntries(
                                                offlineCrowdCountListData[i]
                                                    .attachment[index],
                                            );
                                        },
                                    );
                            }
                        });
                    });
                store.dispatch({
                    type: ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_GET_FAILED,
                });
                store.dispatch({
                    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                });
            }
        }
    }, [isFocused, offlineCrowdCountListData]);

    /* Offline Fire Alarm List Data */

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === true &&
                offlineFireAlarmListData.length > 0
            ) {
                offlineFireAlarmListData &&
                    offlineFireAlarmListData.map((data, i) => {
                        setFireAlarm(data).then((res) => {
                            if (res.status === 200) {
                                offlineFireAlarmListData[i].attachment.length >
                                    0 &&
                                    offlineFireAlarmListData[i].attachment.map(
                                        (data, index) => {
                                            data._parts[1][1] =
                                                res.data.reportID;
                                            uploadAttachmentShiftReportsEntries(
                                                offlineFireAlarmListData[i]
                                                    .attachment[index],
                                            );
                                        },
                                    );
                            }
                        });
                    });
                store.dispatch({
                    type: ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_GET_FAILED,
                });
                store.dispatch({
                    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                });
            }
        }
    }, [isFocused, offlineFireAlarmListData]);

    return (
        <BackgroundGlobal>
            <StatusBar barStyle="light-content" translucent={true}></StatusBar>
            {messageLoading ||
            messageMarkLoading ||
            loading_offlineWelfareCheck ||
            loading_offlineMaintenance ||
            loading_offlinePatrol ||
            addMaintainenaceLoading ||
            loading_offlineCrowdCount ||
            createReportEntryLoading ||
            loading_offline ||
            shiftReportsEntriesAttachmentsLoading ? (
                <AppLoader />
            ) : (
                <MainFrame>
                    <ScrollView>
                        {messageListData &&
                        Object.keys(messageListData).length > 0 &&
                        messageListData.length > 0 ? (
                            messageListData.map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => {
                                        props.navigation.navigate(
                                            navigationStrings.MESSAGE_DETAIL,
                                            { item: item },
                                        );
                                    }}>
                                    <ShiftItemLayout>
                                        <ContentWrapper>
                                            <TitleText fontSize={fontSizeState}>
                                                {item.fromName} -{' '}
                                                {item.createdDateTimeText}
                                            </TitleText>
                                            <ExpireText
                                                numberOfLines={4}
                                                fontSize={fontSizeState}>
                                                {item.message}
                                            </ExpireText>
                                            <ItemBottom>
                                                <TouchableOpacity
                                                    disabled={
                                                        item.isRead && true
                                                    }
                                                    onPress={async () => {
                                                        await setMessageRead({
                                                            id: item.messageID,
                                                        });
                                                    }}>
                                                    <CheckView>
                                                        <Image
                                                            source={
                                                                item.isRead ===
                                                                true
                                                                    ? require('@root/assets/check/check.png')
                                                                    : require('@root/assets/uncheck/checkuncheck.png')
                                                            }
                                                        />
                                                        <TitleLabel
                                                            fontSize={
                                                                fontSizeState
                                                            }>
                                                            {' '}
                                                            Mark as Read
                                                        </TitleLabel>
                                                    </CheckView>
                                                </TouchableOpacity>
                                                {item.hasAttachment && (
                                                    <BtnView>
                                                        <ViewText>
                                                            View Image
                                                        </ViewText>
                                                    </BtnView>
                                                )}
                                            </ItemBottom>
                                        </ContentWrapper>
                                    </ShiftItemLayout>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <NotFoundTv fontSize={fontSizeState}>
                                No Message Found
                            </NotFoundTv>
                        )}
                    </ScrollView>
                </MainFrame>
            )}
            {netInfo.isInternetReachable === false && <NoInternetView />}
        </BackgroundGlobal>
    );
};
type FontSizeProps = {
    fontSize: number;
};

const NotFoundTv = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardSubTitle};
    text-align: center;
    justify-content: center;
`;

const ViewText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
`;

const BtnView = styled.View`
border:1px;
border-radius:5px;
border-color:${({ theme }: any) => theme.colors.text};
padding:6px
margin-left:auto`;

const TitleText = styled.Text<FontSizeProps>`
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
    text-transform: capitalize;
    color: #e5e5e5;
`;

const ExpireText = styled.Text<FontSizeProps>`
    font-style: normal;
    font-weight: bold;
    margin-top: 10px;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
    line-height: 18px;
    text-transform: capitalize;
    color: #e5e5e5;
`;

const MarkReadText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
`;

const ItemBottom = styled.View`
    margin-top: 15px;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const ContentWrapper = styled.View`
    width: 100%;
`;

const CheckView = styled.View`
    flex-direction: row;
    align-items: center;
`;

const TitleLabel = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
    font-weight: 600;
    color: ${({ theme }: any) => theme.colors.text};
`;

const CheckBoxBackground = styled.View`
    background: #29313e;
    padding: 10px 0 0 0;
`;

const ShiftItemLayout = styled.View`
    flex-direction: row;
    background: #17907a;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 14px;
    display: flex;
    align-items: center;
`;

const MainFrame = styled.View`
    padding: 16px;
    height: 100%;
`;
