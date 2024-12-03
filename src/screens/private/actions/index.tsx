import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Appearance } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

import ActionItem from '@root/screens/private/actions/actionItem';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { useIsFocused } from '@react-navigation/native';
import { NotFound, NotFoundWrapper } from '@root/utils/globalStyle';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { NetworkStateView } from '@root/components/NetworkStateView';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../../../utils/AppLoader';
import { NoInternetView } from '../../../components/NoInternetView';
import { store } from '../../../store';
import { apiUri } from '@root/service/apiEndPoints';
import { ActionType_OfflineQR } from '../../../store/offlineQR/actions-types';
import { ActionType_Offline_Patrol } from '../../../store/putOfflinePatrolEntry/actions-types';
import { ActionType_Offline_Maintenance } from '../../../store/putOfflineMaintenanceEntry/actions-types';
import { ActionType_Offline_Welfare_Check } from '../../../store/putOfflineWelfareCheckEntry/actions-types';
import { ActionType_Offline_Upload_Attachment } from '../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { navigationRef } from '../../../navigation/RootNavigation';
import { ActionType_Offline_Intoxication } from '../../../store/putOfflineIntoxicationEntry/actions-types';
import { ActionType_Offline_Vehicle_Report } from '../../../store/putOfflineVehicleReportEntry/actions-types';
import { ActionType_Offline_Boat_Report } from '../../../store/putOfflineBoatReportEntry/actions-types';
import { ActionType_Offline_Crowd_Count } from '../../../store/putOfflineCrowdCountEntry/actions-types';
import { ActionType_Offline_Fire_Alarm } from '../../../store/putOfflineFireAlarmEntry/actions-types';

export const Actions = (props: any) => {
    const { navigation } = props;
    const {
        getActions,
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

    const isFocused = useIsFocused();
    const [scannedData, setScannedData] = useState();
    const { offlineListData, loading_offline } = useTypedSelector(
        (state) => state.offlineListData,
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

    const { orgID } = useTypedSelector((state) => state.auth);
    const { actionsData, loading } = useTypedSelector((state) => state.actions);
    const netInfo = useNetInfo();
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
        // @ts-ignore
        setScannedData(asyncStorageRes);
    });

    /* API */

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === null ||
                netInfo.isInternetReachable === true
            ) {
                getActions({
                    'g-org': JSON.stringify(orgID),
                    'status': '',
                });
            }
        }
    }, [isFocused]);

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

    /* Offline Maintenance List data */

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

    /* Offline Welfare Check List data */

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

    /* offline Intoxication List Data */

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

    /* offline Vehicle report entry */

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
                                            data._parts[1][1] ===
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
        <BackgroundGlobal>
            {loading ||
            createReportEntryLoading ||
            loading_offlinePatrol ||
            loading_offlineWelfareCheck ||
            loading_offlineMaintenance ||
            addMaintainenaceLoading ||
            loading_offlineCrowdCount ||
            loading_offline ||
            loading_offlineVehicleReport ||
            shiftReportsEntriesAttachmentsLoading ? (
                <AppLoader />
            ) : (
                <MainFrame>
                    {actionsData.length > 0 ? (
                        <FlatList
                            nestedScrollEnabled={true}
                            data={actionsData}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <ActionItem
                                        item={item}
                                        navigation={navigation}
                                        key={1}
                                        actionTitle={true}
                                    />
                                );
                            }}
                        />
                    ) : (
                        <NotFoundTv fontSize={fontSizeState}>
                            No Data Found
                        </NotFoundTv>
                    )}
                </MainFrame>
            )}

            {netInfo.isInternetReachable === false && <NoInternetView />}
        </BackgroundGlobal>
    );
};

const NotFoundTv = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardSubTitle};
    text-align: center;
    justify-content: center;
`;

const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
`;
