import { combineReducers } from 'redux';
import auth from '@root/store/auth/reducer';
import actions from '@root/store/actions/reducer';
import rosters from '@root/store/rosters/reducer';
import modalSheet from '@root/store/global_modal/reducer';
import actionS from '@root/store/activeShift/reducer';
import shiftReports from '@root/store/shift-reports/reducer';
import checkpoints from '@root/store/checkpoints/reducer';
import mode from '@root/store/mode/reducer';
import logs from '@root/store/log/reducer';
import intoxicationData from '@root/store/intoxication/reducer';
import crowdCountData from '@root/store/crowdCount/reducer';
import boatReportData from '@root/store/boatReport/reducer';
import welfareData from '@root/store/welfare/reducer';
import vehicleData from '@root/store/vehicle/reducer';
import fireAlarmData from '@root/store/fireAlarm/reducer';
import armHoldUpData from '@root/store/armHoldUp/reducer';
import bombThreatData from '@root/store/bomb-threat/reducer';
import accidentData from '@root/store/accident/reducer';
import fontSizeState from '@root/store/fontSize/reducer';
import multiStepdata from '@root/store/multistep/reducer';
import bombThreatmultiStepdata from '@root/store/bomThreatMultiStep/reducer';
import armedmultiStepdata from '@root/store/armholdUpMultiStep/reducer';
import accidentmultiStepdata from '@root/store/accidentMultiStep/reducer';
import messageListData from '@root/store/messageList/reducer';
import messageDetailData from '@root/store/messageDetail/reducer';
import messageFilesData from '@root/store/messageFiles/reducer';
import messageMarkData from '@root/store/messageMarkRead/reducer';
import siteListData from '@root/store/shiftSites/reducer';
import codeListData from '@root/store/shiftCodes/reducer';
import orgCodeData from '@root/store/orgCode/reducer';
import orgIDData from '@root/store/orgID/reducer';
import maintainenacelistData from '@root/store/maintenanceType/reducer';
import addMaintainenaceData from '@root/store/addMaintenance/reducer';
import locationLogData from '@root/store/locationLog/reducer';
import offlineListData from '@root/store/offlineQR/reducer';
import offlinePatrolListData from '@root/store/putOfflinePatrolEntry/reducer';
import offlineMaintenanceListData from '@root/store/putOfflineMaintenanceEntry/reducer';
import offlineUploadAttachmentShiftListData from '@root/store/putOfflineUploadAttachmentShiftReportsEntries/reducer';
import offlineWelfareCheckListData from '@root/store/putOfflineWelfareCheckEntry/reducer';
import offlineIntoxicationListData from '@root/store/putOfflineIntoxicationEntry/reducer';
import offlineVehicleReportListData from '@root/store/putOfflineVehicleReportEntry/reducer';
import offlineBoatReportListData from '@root/store/putOfflineBoatReportEntry/reducer';
import offlineCrowdCountListData from '@root/store/putOfflineCrowdCountEntry/reducer';
import offlineFireAlarmListData from '@root/store/putOfflineFireAlarmEntry/reducer';

const reducers = combineReducers({
    auth,
    actions,
    rostersByDays: rosters,
    modalSheet,
    activeShift: actionS,
    shiftReports,
    checkpoints,
    mode,
    logs,
    intoxicationData,
    crowdCountData,
    boatReportData,
    welfareData,
    vehicleData,
    fireAlarmData,
    armHoldUpData,
    bombThreatData,
    accidentData,
    fontSizeState,
    multiStepdata,
    bombThreatmultiStepdata,
    armedmultiStepdata,
    accidentmultiStepdata,
    messageListData,
    messageDetailData,
    messageFilesData,
    messageMarkData,
    siteListData,
    codeListData,
    orgCodeData,
    orgIDData,
    maintainenacelistData,
    addMaintainenaceData,
    locationLogData,
    offlineListData,
    offlinePatrolListData,
    offlineMaintenanceListData,
    offlineUploadAttachmentShiftListData,
    offlineWelfareCheckListData,
    offlineIntoxicationListData,
    offlineVehicleReportListData,
    offlineBoatReportListData,
    offlineCrowdCountListData,
    offlineFireAlarmListData,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
