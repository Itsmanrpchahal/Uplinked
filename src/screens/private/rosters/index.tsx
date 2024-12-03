import React, { useEffect, useState, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableHighlight,
} from 'react-native';

// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';

import { TouchableOpacity } from 'react-native';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { apiUri } from '@root/service/apiEndPoints';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import {
    MainParentWrapper,
    NotFound,
    NotFoundWrapper,
} from '@root/utils/globalStyle';
import { format } from 'date-fns';
import { useNetInfo } from '@react-native-community/netinfo';
import { NetworkStateView } from '@root/components/NetworkStateView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../../../utils/AppLoader';
import { NoInternetView } from '../../../components/NoInternetView';
import { store } from '../../../store';
import { ActionType_Offline_Upload_Attachment } from '../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { ActionType_OfflineQR } from '../../../store/offlineQR/actions-types';
import { ActionType_Offline_Patrol } from '../../../store/putOfflinePatrolEntry/actions-types';
import { ActionType_Offline_Maintenance } from '../../../store/putOfflineMaintenanceEntry/actions-types';
import { ActionType_Offline_Welfare_Check } from '../../../store/putOfflineWelfareCheckEntry/actions-types';
import { ActionType_Offline_Intoxication } from '../../../store/putOfflineIntoxicationEntry/actions-types';
import { navigationRef } from '../../../navigation/RootNavigation';
import { ActionType_Offline_Vehicle_Report } from '../../../store/putOfflineVehicleReportEntry/actions-types';
import { ActionType_Offline_Boat_Report } from '../../../store/putOfflineBoatReportEntry/actions-types';
import { ActionType_Offline_Crowd_Count } from '../../../store/putOfflineCrowdCountEntry/actions-types';
import { ActionType_Offline_Fire_Alarm } from '../../../store/putOfflineFireAlarmEntry/actions-types';

function Roster(props: any) {
    const isFocused = useIsFocused();
    const {
        getRosters,
        openModal,
        closeModal,
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

    const orgID = useTypedSelector((state) => state.auth.orgID);

    const [scannedData, setScannedData] = useState();

    const [tab, setTab] = useState<number>(1);

    const { rosterData, roasterLoading } = useTypedSelector(
        (state) => state.rostersByDays,
    );

    const { addMaintainenaceData, addMaintainenaceLoading }: any =
        useTypedSelector((state) => state.addMaintainenaceData);

    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);

    const {
        offlineUploadAttachmentShiftListData,
        loading_offlineUploadAttachmentShift,
    } = useTypedSelector((state) => state.offlineUploadAttachmentShiftListData);

    const { offlineListData, loading_offline } = useTypedSelector(
        (state) => state.offlineListData,
    );

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

    const { modalProps } = useTypedSelector((state) => state.modalSheet);
    // @ts-ignore
    AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
        // @ts-ignore
        setScannedData(asyncStorageRes);
    });
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    useEffect(() => {
        if (isFocused) {
            if (modalProps !== null) {
                closeModal();
            }
        }
    }, [isFocused]);

    /* API */
    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === null ||
                netInfo.isInternetReachable === true
            ) {
                getRosters({
                    uri: `${apiUri.shifts.shiftsByWeek}` + tab,
                    orgID: orgID,
                    type: 'week',
                });
            }
        }
    }, [isFocused, tab]);

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

    /* offline Maintenance List data */

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

    /* Offline welfare Check list */

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

    /* offline Intoxication List data */

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

    /* Offline vehicle report list data */

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

    /* Offline Boat Report List Data*/

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
                                            data._parts[i][i] =
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

    /* Offline Crowd Count List Data */

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
        <MainParentWrapper>
            <StatusBar translucent={true}></StatusBar>
            <BackgroundGlobal>
                {roasterLoading ||
                createReportEntryLoading ||
                loading_offlineWelfareCheck ||
                loading_offlinePatrol ||
                loading_offlineMaintenance ||
                addMaintainenaceLoading ||
                loading_offlineVehicleReport ||
                loading_offlineCrowdCount ||
                loading_offline ||
                shiftReportsEntriesAttachmentsLoading ? (
                    <AppLoader />
                ) : (
                    <MainFrame style={{ marginBottom: 60 }}>
                        <Tabs>
                            <TouchableOpacity
                                onPress={() => {
                                    setTab(0);
                                }}>
                                <TabItem
                                    fontSize={fontSizeState}
                                    style={
                                        tab === 0 && {
                                            color: props.theme.colors
                                                .accentColor,
                                        }
                                    }>
                                    Last Week
                                </TabItem>
                            </TouchableOpacity>
                            <VerticleLine />
                            <TouchableOpacity
                                onPress={() => {
                                    setTab(1);
                                }}>
                                <TabItem
                                    fontSize={fontSizeState}
                                    style={
                                        tab === 1 && {
                                            color: props.theme.colors
                                                .accentColor,
                                        }
                                    }>
                                    This Week
                                </TabItem>
                            </TouchableOpacity>
                            <VerticleLine />
                            <TouchableOpacity
                                onPress={() => {
                                    setTab(2);
                                }}>
                                <TabItem
                                    fontSize={fontSizeState}
                                    style={
                                        tab === 2 && {
                                            color: props.theme.colors
                                                .accentColor,
                                        }
                                    }>
                                    Next Week
                                </TabItem>
                            </TouchableOpacity>
                        </Tabs>

                        {rosterData.length > 0 ? (
                            <FlatList
                                nestedScrollEnabled={true}
                                data={rosterData}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() =>
                                                openModal('RosterView', {
                                                    item,
                                                    button: false,
                                                    height: '65%',
                                                    fontSize: fontSizeState,
                                                })
                                            }>
                                            <ShiftItemHorizontal>
                                                <ShiftItemVertical>
                                                    <DateText
                                                        fontSize={
                                                            fontSizeState
                                                        }>
                                                        {format(
                                                            new Date(
                                                                item.rosterStart,
                                                            ),
                                                            'do',
                                                        )}
                                                    </DateText>
                                                    <DayText
                                                        fontSize={
                                                            fontSizeState
                                                        }>
                                                        {format(
                                                            new Date(
                                                                item.rosterStart,
                                                            ),
                                                            'EE',
                                                        )}
                                                    </DayText>
                                                </ShiftItemVertical>

                                                <ShiftItemLayout>
                                                    <View>
                                                        <ShiftItemHorizontal>
                                                            <Timeicon
                                                                source={require('@root/assets/clock/clock.png')}
                                                            />
                                                            <TimeText
                                                                fontSize={
                                                                    fontSizeState
                                                                }>
                                                                {format(
                                                                    new Date(
                                                                        item.rosterStart,
                                                                    ),
                                                                    'EEE',
                                                                )}
                                                                {
                                                                    item.rosterStart
                                                                        .split(
                                                                            'T',
                                                                        )[1]
                                                                        .split(
                                                                            ':',
                                                                        )[0]
                                                                }
                                                                :
                                                                {
                                                                    item.rosterStart
                                                                        .split(
                                                                            'T',
                                                                        )[1]
                                                                        .split(
                                                                            ':',
                                                                        )[1]
                                                                }
                                                                {' - '}
                                                                {
                                                                    item.rosterEnd
                                                                        .split(
                                                                            'T',
                                                                        )[1]
                                                                        .split(
                                                                            ':',
                                                                        )[0]
                                                                }
                                                                :
                                                                {
                                                                    item.rosterEnd
                                                                        .split(
                                                                            'T',
                                                                        )[1]
                                                                        .split(
                                                                            ':',
                                                                        )[1]
                                                                }
                                                            </TimeText>
                                                        </ShiftItemHorizontal>
                                                        <TitleText
                                                            fontSize={
                                                                fontSizeState
                                                            }>
                                                            {item.siteName}
                                                        </TitleText>
                                                        <CodeText
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            numberOfLines={1}>
                                                            {item.notes}
                                                        </CodeText>
                                                    </View>
                                                </ShiftItemLayout>
                                            </ShiftItemHorizontal>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        ) : (
                            <NotFoundWrapperRoster>
                                <NotFound>No Rosters Data Found </NotFound>
                            </NotFoundWrapperRoster>
                        )}
                    </MainFrame>
                )}
                {netInfo.isInternetReachable === false && <NoInternetView />}
            </BackgroundGlobal>
        </MainParentWrapper>
    );
}

// @ts-ignore
export default withTheme(Roster);

type FontSizeProps = {
    fontSize: number;
};

const NotFoundWrapperRoster = styled.View`
    justify-content: center;
    align-items: center;
`;

const DateText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    color: ${({ theme }: any) => theme.colors.text};
    padding-bottom: 2px;
`;

const VerticleLine = styled.View`
    width: 1px;
    height: 30px;
    background-color: ${({ theme }: any) => theme.colors.textGray}; ;
`;

const TabItem = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.textGray};
    text-align: center;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
`;

const Tabs = styled.View`
    position: relative;
    z-index: 1;
    padding: 10px 15px 10px 15px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: ${({ theme }: any) => theme.colors.primary};
`;

const ShiftItemHorizontal = styled.View`
    flex-direction: row;
    align-items: center;
`;

const TimeText = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
`;

const Timeicon = styled.Image`
    margin-right: 8px;
`;

const DayText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    font-weight: 400;
    align-items: center;
    display: flex;
    text-align: center;
    width: 100%;
    color: ${({ theme }: any) => theme.colors.text};
`;

const TitleText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardSubTitle}px;
    font-weight: 400;
    color: ${({ theme }: any) => theme.colors.text};
    margin-top: 3px;
`;

const CodeText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    font-weight: 500;
    color: ${({ theme }: any) => theme.colors.text};
`;

const ShiftItemLayout = styled.View`
    background: ${({ theme }: any) => theme.colors.primary};
    border-radius: 8px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 10px;
    padding: 14px;
    width: 72%;
`;

const ShiftItemVertical = styled.View`
    background: ${({ theme }: any) => theme.colors.primary};
    border-radius: 8px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 10px;
    padding: 21px 5px;
    width: 20%;
    min-width: 70px;
    text-align: center;
    justify-content: center;
    align-items: center;
`;
const MainFrame = styled.View`
    flex: 1;
`;
