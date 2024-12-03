import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StatusBar, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import ActionItem from '@root/screens/private/actions/actionItem';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { NotFound } from '@root/utils/globalStyle';
import { useIsFocused } from '@react-navigation/native';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import HomeRosters from '@root/components/rosters/HomeRosters';
import { apiUri } from '@root/service/apiEndPoints';
import { useNetInfo } from '@react-native-community/netinfo';
import AppLoader from '../../../utils/AppLoader';
import { NoInternetView } from '../../../components/NoInternetView';
import { store } from '../../../store';
import { ActionType_Offline_Patrol } from '../../../store/putOfflinePatrolEntry/actions-types';
import { ActionType_OfflineQR } from '../../../store/offlineQR/actions-types';
import { ActionType_Offline_Maintenance } from '../../../store/putOfflineMaintenanceEntry/actions-types';
import { ActionType_Offline_Upload_Attachment } from '../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { ActionType_Offline_Welfare_Check } from '../../../store/putOfflineWelfareCheckEntry/actions-types';
import { navigationRef } from '../../../navigation/RootNavigation';
import { ActionType_Offline_Intoxication } from '../..//../store/putOfflineIntoxicationEntry/actions-types';
import { ActionType_Offline_Vehicle_Report } from '../../../store/putOfflineVehicleReportEntry/actions-types';
import { ActionType_Offline_Boat_Report } from '../../../store/putOfflineBoatReportEntry/actions-types';
import { ActionType_Offline_Crowd_Count } from '../../../store/putOfflineCrowdCountEntry/actions-types';
import { ActionType_Offline_Fire_Alarm } from '../../../store/putOfflineFireAlarmEntry/actions-types';

const Home = (props: any) => {
    const {
        putOfflineUploadAttachmentShiftReportEntries,
        shiftReportImageUpload,
        getActions,
        getRosters,
        closeModal,
        createReportEntryForShift,
        addMaintenance,
        uploadAttachmentShiftReportsEntries,
        addWelfare,
        setScannedCheckPointsEntries,
        getShiftsCheckPointsEntries,
        setIntoxication,
        addVehicle,
        setBoatReport,
        setCrowdCount,
        setFireAlarm,
    } = useActions();
    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);

    const { addMaintainenaceData, addMaintainenaceLoading }: any =
        useTypedSelector((state) => state.addMaintainenaceData);

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

    const {
        offlineUploadAttachmentShiftListData,
        loading_offlineUploadAttachmentShift,
    } = useTypedSelector((state) => state.offlineUploadAttachmentShiftListData);

    const isFocused = useIsFocused();
    const { orgID } = useTypedSelector((state) => state.auth);
    const { actionsData, loading } = useTypedSelector((state) => state.actions);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { rosterData, roasterLoading } = useTypedSelector(
        (state) => state.rostersByDays,
    );
    const { offlineListData, loading_offline } = useTypedSelector(
        (state) => state.offlineListData,
    );
    // @ts-ignore
    const { modalProps } = useTypedSelector((state) => state.modalSheet);
    const netInfo = useNetInfo();

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

    /* Offline Upload Attachment Shift Report List Data */

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === true &&
                offlineUploadAttachmentShiftListData.length > 0
            ) {
                offlineUploadAttachmentShiftListData &&
                    offlineUploadAttachmentShiftListData.map((data, i) => {
                        uploadAttachmentShiftReportsEntries(data);
                    });
                store.dispatch({
                    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                });
            }
        }
    }, [isFocused, offlineUploadAttachmentShiftListData]);

    /* Offline Patrol List Data */

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

    /* Offline Welfare Check List Data */

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

    /* Offline Intoxication List Data */

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

    /* Offline Vehicle Report List Data */

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

    /* */
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
            getActions({
                status: 'urgent',
            });
            getRosters({
                uri: `${apiUri.shifts.shiftsByDay}` + '7',
                orgID: orgID,
                type: 'day',
            });
        }
    }, [isFocused]);

    useEffect(() => {
        console.log(offlineListData.length);
    }, [offlineListData]);

    return (
        <MainWrapper>
            <StatusBar barStyle="light-content" translucent={true}></StatusBar>
            <BackgroundGlobal>
                {loading ||
                loading_offline ||
                loading_offlinePatrol ||
                loading_offlineMaintenance ||
                loading_offlineWelfareCheck ||
                loading_offlineCrowdCount ||
                roasterLoading ||
                createReportEntryLoading ||
                addMaintainenaceLoading ||
                shiftReportsEntriesAttachmentsLoading ? (
                    <AppLoader />
                ) : (
                    <MainFrame>
                        {actionsData && actionsData.length > 0 ? (
                            <FlatList
                                nestedScrollEnabled={true}
                                data={actionsData}
                                renderItem={({ item }) => {
                                    return (
                                        <ActionItem
                                            item={item}
                                            navigation={props.navigation}
                                            key={1}
                                            actionTitle={true}
                                        />
                                    );
                                }}
                            />
                        ) : (
                            <NotDataFoundWrapper>
                                <NotFound>Actions</NotFound>
                                <NotFound style={{ marginTop: 10 }}>
                                    No Action Data Found
                                </NotFound>
                            </NotDataFoundWrapper>
                        )}

                        <TouchableOpacity onPress={() => {}}>
                            <TodayText>
                                Today, {format(new Date(), 'EEEE d/L')}
                            </TodayText>
                        </TouchableOpacity>

                        {roasterLoading ? (
                            <NotFound>Loading...</NotFound>
                        ) : rosterData && rosterData.length > 0 ? (
                            <FlatList
                                nestedScrollEnabled={true}
                                data={rosterData}
                                renderItem={({ item }) => {
                                    return (
                                        <HomeRosters
                                            fontSize={fontSizeState}
                                            item={item}
                                            navigation={props.navigation}
                                            type={'modal'}
                                        />
                                    );
                                }}
                            />
                        ) : (
                            <NotFound>No Rosters Data Found</NotFound>
                        )}
                    </MainFrame>
                )}
                {netInfo.isInternetReachable === false && <NoInternetView />}
            </BackgroundGlobal>
        </MainWrapper>
    );
};

export default withTheme(Home);

const MainWrapper = styled.View`
    flex: 1;
`;

const NotDataFoundWrapper = styled.View`
    padding-bottom: 15px;
    justify-content: center;
    align-items: flex-start;
`;

const TodayText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0 10px 0;
`;

const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
`;
