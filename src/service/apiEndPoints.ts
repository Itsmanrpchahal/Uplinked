import { useEffect } from "react";
import { store } from "store";

// const baseURL = 'https://linkedup-app-api.azurewebsites.net/api/v2';
const baseURL = 'https://uplinked-dir.azurewebsites.net/api/';

const apiUri = {
    orgCode: {
        orgCode: 'org-code'
    },

    auth: {
        login: '/Auth/login',
        refreshToken: '/Auth/refresh-token',
        getOrgID : '/user/orgs'
    },
    shifts: {
        shiftsByDay: '/roster/day/',
        // shiftsByWeek: 'shifts/rosters/week',
        startShift: '/shifts/start/',
        activeShift: '/shifts/active',
        endShift: '/shifts/end',
        createPetrolEntry: '/shifts/report/patrol',
        getShiftReports: '/shifts/', // + 123/reports
        shiftReportImageUpload: '/shifts/report/upload/',
        getShiftReportFiles: '/document/report/', // + /12/files
        deleteShiftReportFile: '/document/', // + /fileID
        upcomingRosters: '/roster/upcoming', // for shift tab (but for no shift)
        scanNewShiftCheckPoint: '/shifts/checkpoint',
        getScannedCheckPoints: '/shifts/', // + /123/checkpoints
        deleteScannedCheckPoint: '/shifts/checkpoint', // + /id
        deletePetrolReports: '/shifts/report', // + /shiftReportID
        statusGet: '/Guard/actions?status=', // urgent, overdue, warning etc
        shiftsByWeek: '/roster/week/mobile/', // + /number 0 for lastWeek, 1 for thisWeek, 2 for nextWEEK
        shiftByDate: '/roster/date', // date 'MM/DD/YYYY', g-org
        actions: '/Guard/actions?status=', // + status, g-org id in headers
        statusDetail: '/Guard/action', // + /actionID
        addIntoxication: '/shifts/report/intoxication',
        getIntoxication: '/shifts/report/intoxication/',//shiftreportID
        updateIntoxication: '/shifts/report/intoxication',
        deleteCheckPoint: '/shifts/checkpoint/',
        deleteReportEntry: '/shifts/report/',
        getSites: '/shifts/sites?',
        shiftCodes: '/shifts/site?',
        manintenanceTypes :'/shifts/report/maintenance/maintenance-type',
        addMaintenance:'/shifts/report/maintenance',
        
    },

    reports: {
        addCrowdCount: '/shifts/report/crowd-count',
        getCrowdCount: '/shifts/report/crowd-count/',
        getMaintenance:'/shifts/report/maintenance/',
        updateMaintenance:'/shifts/report/maintenance/',
        updateCrowdCount: '/shifts/report/crowd-count',
        addBoatReport: '/shifts/report/boat',
        getBoatReport: '/shifts/report/boat/',
        updateBoatReport: '/shifts/report/boat',
        addWelfare: '/shifts/report/welfare',
        getWelfare: '/shifts/report/welfare/',
        updateWelfare: '/shifts/report/welfare',
        addVehicle: '/shifts/report/vehicle',
        getVehicle: '/shifts/report/vehicle/',
        updateVehicle: '/shifts/report/vehicle',
        addfireAlarm: '/shifts/report/fire-alarm',
        getfireAlarm: '/shifts/report/fire-alarm/',
        updatefireAlarm: '/shifts/report/fire-alarm',
        addArmedHoldUp: '/shifts/report/armed-holdup',
        getArmedHoldUp: '/shifts/report/armed-holdup/',
        updateArmedHoldUp: '/shifts/report/armed-holdup',
        addBombThreat: '/shifts/report/bomb-threat',
        getBombThreat: '/shifts/report/bomb-threat/',
        updateBombThreat: '/shifts/report/bomb-threat',
        addAccident: '/shifts/report/accident',
        getAccident: '/shifts/report/accident/',
        updateAccident: '/shifts/report/accident',
        getFile: '/Guard/file/'
    },

    message: {
        messageList: '/Guard/messages?', // g-org in headers, page, rows
        messageDetail: '/Guard/message/',
        messageFiles: '/document/message/',// id in url + /files
        messageFileDelete: '/Guard/file/', //id in url
        messageMarkRead: '/Guard/message/' //id message
    },
    logs: {
        log: '/App/logs', // g-org id in headers (Optional)
        locationLog :'/App/location-log'
    }
};

export { apiUri, baseURL };
