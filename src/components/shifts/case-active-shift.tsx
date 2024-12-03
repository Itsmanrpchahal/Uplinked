import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import { MainParentWrapper, NotFound } from '@root/utils/globalStyle';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { useIsFocused } from '@react-navigation/native';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import CaseActiveShiftItem from './case-active-shift-item';
import CaseScannedShiftItem from './case-scanned-shift-item';
import { FloatingAction } from 'react-native-floating-action';
import { actionsButtonIcons } from '../../utils/common-methods';
import { navigationRef } from '../../navigation/RootNavigation';
import navigationStrings from '../../navigation/navigationStrings';
import { NetworkStateView } from '../NetworkStateView';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import AppLoader from '../../utils/AppLoader';
import { apiUri } from '@root/service/apiEndPoints';
import { NoInternetView } from '../NoInternetView';
import { store } from '../../store';
import { ActionType_Offline_Patrol } from '../../store/putOfflinePatrolEntry/actions-types';
import { ActionType_Offline_Maintenance } from '../../store/putOfflineMaintenanceEntry/actions-types';
import { ActionType_OfflineQR } from '../../store/offlineQR/actions-types';
import { ActionType_Offline_Welfare_Check } from '../../store/putOfflineWelfareCheckEntry/actions-types';
import { ActionType_Offline_Upload_Attachment } from '../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { ActionType_Offline_Intoxication } from '../../store/putOfflineIntoxicationEntry/actions-types';
import { ActionType_Offline_Vehicle_Report } from '../../store/putOfflineVehicleReportEntry/actions-types';
import { ActionType_Offline_Boat_Report } from '../../store/putOfflineBoatReportEntry/actions-types';
import { ActionType_Offline_Crowd_Count } from '../../store/putOfflineCrowdCountEntry/actions-types';
import { ActionType_Offline_Fire_Alarm } from '../../store/putOfflineFireAlarmEntry/actions-types';

type CaseActiveShiftProps = {
    item: any;
};

const CaseActiveShift: React.FC<CaseActiveShiftProps> = ({ item }) => {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const [tab, setTab] = useState<string>('1');
    const [scannedData, setScannedData] = useState();

    const {
        getShiftsReportsEntries,
        getShiftsCheckPointsEntries,
        closeModal,
        deleteCheckPoint,
        createReportEntryForShift,
        uploadAttachmentShiftReportsEntries,
        addMaintenance,
        addWelfare,
        setScannedCheckPointsEntries,
        setIntoxication,
        addVehicle,
        setBoatReport,
        setCrowdCount,
        setFireAlarm,
    } = useActions();

    const { addMaintainenaceData, addMaintainenaceLoading }: any =
        useTypedSelector((state) => state.addMaintainenaceData);

    const { offlineUploadAttachmentShiftListData } = useTypedSelector(
        (state) => state.offlineUploadAttachmentShiftListData,
    );

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

    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);

    const { shiftReportData, shiftReportLoading } = useTypedSelector(
        (state) => state.shiftReports,
    );
    const { shiftCheckpointsData, shiftCheckoutLoading } = useTypedSelector(
        (state) => state.checkpoints,
    );
    const { modalProps } = useTypedSelector((state) => state.modalSheet);
    const isFocused = useIsFocused();
    const netInfo = useNetInfo();
    AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
        // @ts-ignore
        setScannedData(asyncStorageRes);
    });

    /* API Entries */
    useEffect(() => {
        if (isFocused) {
            if (modalProps !== null) {
                closeModal();
            }
            if (
                netInfo.isInternetReachable === null ||
                netInfo.isInternetReachable === true
            ) {
                getShiftsReportsEntries({ id: item.shiftID });
            }
        }
    }, [isFocused]);

    /*   Offline QR Code */

    useEffect(() => {
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
    }, [netInfo, offlineListData]);

    /* Offline Patrol List Data */

    useEffect(() => {
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
                            offlinePatrolListData[i].attachment.length > 0 &&
                                offlinePatrolListData[i].attachment.map(
                                    (data, index) => {
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlinePatrolListData[i].attachment[
                                                index
                                            ],
                                        );
                                    },
                                );
                            getShiftsReportsEntries({ id: item.shiftID });
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
    }, [netInfo, offlinePatrolListData]);

    /* Offline Maintenance List Data */

    useEffect(() => {
        if (
            netInfo.isInternetReachable === true &&
            offlineMaintenanceListData.length > 0
        ) {
            offlineMaintenanceListData &&
                offlineMaintenanceListData.map((data, i) => {
                    addMaintenance(data).then((res) => {
                        if (res.status === 200) {
                            offlineMaintenanceListData[i].attachment.length >
                                0 &&
                                offlineMaintenanceListData[i].attachment.map(
                                    (data, index) => {
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineMaintenanceListData[i]
                                                .attachment[index],
                                        );
                                    },
                                );
                            getShiftsReportsEntries({ id: item.shiftID });
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
    }, [netInfo, offlineMaintenanceListData]);

    /* Offline Welfare  Check List data*/

    useEffect(() => {
        if (
            netInfo.isInternetReachable === true &&
            offlineWelfareCheckListData.length > 0
        ) {
            offlineWelfareCheckListData &&
                offlineWelfareCheckListData.map((data, i) => {
                    addWelfare(data).then((res) => {
                        if (res.status === 200) {
                            offlineWelfareCheckListData[i].attachment.length >
                                0 &&
                                offlineWelfareCheckListData[i].attachment.map(
                                    (data, index) => {
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineWelfareCheckListData[i]
                                                .attachment[index],
                                        );  
                                    },
                                );
                            getShiftsReportsEntries({ id: item.shiftID });
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
    }, [netInfo, offlineWelfareCheckListData]);

    /* offline Intoxication list data*/

    useEffect(() => {
        if (
            netInfo.isInternetReachable === true &&
            offlineIntoxicationListData.length > 0
        ) {
            offlineIntoxicationListData &&
                offlineIntoxicationListData.map((data, i) => {
                    setIntoxication(data).then((res) => {
                        if (res.status === 200) {
                            offlineIntoxicationListData[i].attachment.length >
                                0 &&
                                offlineIntoxicationListData[i].attachment.map(
                                    (data, index) => {
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineIntoxicationListData[i]
                                                .attachment[index],
                                        );
                                    },
                                );
                            getShiftsReportsEntries({ id: item.shiftID });
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
    }, [netInfo, offlineIntoxicationListData]);

    /* Offline Vehicle Report List Data */

    useEffect(() => {
        if (
            netInfo.isInternetReachable === true &&
            offlineVehicleReportListData.length > 0
        ) {
            offlineVehicleReportListData &&     
                offlineVehicleReportListData.map((data, i) => {
                    addVehicle(data).then((res) => {
                        if (res.status === 200) {
                            offlineVehicleReportListData[i].attachment.length >
                                0 &&
                                offlineVehicleReportListData[i].attachment.map(
                                    (data, index) => {
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineVehicleReportListData[i]
                                                .attachment[index],
                                        );
                                    },
                                );
                            getShiftsReportsEntries({ id: item.shiftID });
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
    }, [netInfo, offlineVehicleReportListData]);

    /* Offline Boat Report List Data */

    useEffect(() => {
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
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineBoatReportListData[i]
                                                .attachment[index],
                                        );
                                    },
                                );
                            getShiftsReportsEntries({ id: item.shiftID });
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
    }, [netInfo, offlineBoatReportListData]);

    /* Offline Crowd Count List Data */
    useEffect(() => {
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
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineCrowdCountListData[i]
                                                .attachment[index],
                                        );
                                    },
                                );
                            getShiftsReportsEntries({ id: item.shiftID });
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
    }, [netInfo, offlineCrowdCountListData]);

    /* offline fire alarm list data */

    useEffect(() => {
        if (
            netInfo.isInternetReachable === true &&
            offlineFireAlarmListData.length > 0
        ) {
            offlineFireAlarmListData &&
                offlineFireAlarmListData.map((data, i) => {
                    setFireAlarm(data).then((res) => {
                        if (res.status === 200) {
                            offlineFireAlarmListData[i].attachment.length > 0 &&
                                offlineFireAlarmListData[i].attachment.map(
                                    (data, index) => {
                                        data._parts[1][1] = res.data.reportID;
                                        uploadAttachmentShiftReportsEntries(
                                            offlineFireAlarmListData[i]
                                                .attachment[index],
                                        );
                                    },
                                );
                            getShiftsReportsEntries({ id: item.shiftID });
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
    }, [netInfo, offlineFireAlarmListData]);

    // uplinked.com.au
    // @ts-ignore
    return (
        <MainParentWrapper>
            <BackgroundGlobal>
                {shiftReportLoading ||
                shiftCheckoutLoading ||
                createReportEntryLoading ||
                loading_offlineWelfareCheck ||
                addMaintainenaceLoading ||
                loading_offline ||
                loading_offlineVehicleReport ||
                loading_offlineBoatReport ||
                shiftReportsEntriesAttachmentsLoading ? (
                    <AppLoader />
                ) : (
                    <MainFrame>
                        <TabHorizontal>
                            <TouchableOpacity
                                onPress={() => {
                                    setTab('1');
                                    if (
                                        netInfo.isInternetReachable === null ||
                                        netInfo.isInternetReachable === true
                                    ) {
                                        getShiftsReportsEntries({
                                            id: item.shiftID,
                                        });
                                    }
                                }}
                                style={{ width: '50%' }}>
                                <Tabs
                                    style={[
                                        tab === '1'
                                            ? { backgroundColor: '#F18122' }
                                            : { backgroundColor: '#28303D' },
                                    ]}>
                                    <Text
                                        style={[
                                            tab === '1'
                                                ? { color: '#000000' }
                                                : { color: '#FFFFFF' },
                                            { textAlign: 'center' },
                                        ]}>
                                        Shift Report Entries
                                    </Text>
                                </Tabs>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setTab('2');
                                    if (
                                        netInfo.isInternetReachable === null ||
                                        netInfo.isInternetReachable === true
                                    ) {
                                        getShiftsCheckPointsEntries({
                                            id: item.shiftID,
                                        });
                                    }
                                }}
                                style={{ width: '50%' }}>
                                <Tabs
                                    style={
                                        tab === '2'
                                            ? { backgroundColor: '#F18122' }
                                            : { backgroundColor: '#28303D' }
                                    }>
                                    <Text
                                        style={[
                                            tab === '1'
                                                ? { color: '#FFFFFF' }
                                                : { color: '#000000' },
                                            { textAlign: 'center' },
                                        ]}>
                                        Scanned Checkpoints
                                    </Text>
                                </Tabs>
                            </TouchableOpacity>
                        </TabHorizontal>
                        {tab === '1' && (
                            <MainWrapper>
                                {
                                    <CaseActiveShiftItem
                                        shiftItem={item}
                                        shiftReportData={shiftReportData}
                                    />
                                }
                            </MainWrapper>
                        )}

                        {tab === '2' && (
                            <MainWrapper>
                                {
                                    <SwipeListView
                                        data={shiftCheckpointsData}
                                        renderItem={(item) => {
                                            return (
                                                <CaseScannedShiftItem
                                                    checkpoint={
                                                        item.item.checkpoint
                                                    }
                                                    checkpointID={
                                                        item.item.checkpointID
                                                    }
                                                    scannedDateTime={
                                                        item.item
                                                            .scannedDateTime
                                                    }
                                                />
                                            );
                                        }}
                                        rightOpenValue={-50}
                                        renderHiddenItem={(data, rowMap) => (
                                            <DeleteView>
                                                <TouchableOpacity
                                                    onPress={async () => {
                                                        await deleteCheckPoint({
                                                            id: data.item
                                                                .checkpointID,
                                                        });

                                                        getShiftsCheckPointsEntries(
                                                            {
                                                                id: item.shiftID,
                                                            },
                                                        );
                                                    }}>
                                                    <Image
                                                        source={require('@root/assets/delete/delete.png')}
                                                    />
                                                </TouchableOpacity>
                                            </DeleteView>
                                        )}
                                    />
                                }
                            </MainWrapper>
                        )}
                    </MainFrame>
                )}
            </BackgroundGlobal>
                                
            <FloatingAction
                actions={actionsButtonIcons}
                onPressItem={(name) => {
                    navigationRef.current.navigate(navigationStrings.QRSCAN);
                }}
                overlayColor={'rgba(255, 255, 255, 0)'}
                color={'#16a086'}
            />

            {netInfo.isInternetReachable === false && <NoInternetView />}
        </MainParentWrapper>
    );
};

// @ts-ignore
export default withTheme(CaseActiveShift);

type FontSizeProps = {
    fontSize: number;
};

const DeleteView = styled.View`
    width: auto;
    justify-content: center;
    align-items: flex-end;
    border-radius: 8px;
    padding: 14px 14px 14px 14px;
    background-color: ${({ theme }: any) => theme.colors.secondary};
`;
const MainWrapper = styled.View`
    flex: 1;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 32px;
`;

const TabHorizontal = styled.View`
    margin: 20px auto 0 auto;
    display: flex;
    width: 75%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    background-color: #28303d;
`;

const Tabs = styled.View`
    padding-left: 15px;
    padding-right: 15px;
    height: 50px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #28303d;
`;
const MainFrame = styled.View`
    flex: 1;
`;
