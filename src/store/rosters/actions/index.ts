import { ActionType } from '@root/store/rosters/actions-types';

interface RostersInit {
    type: ActionType.ROSTERS_INIT;
}

interface RosterSuccessAction {
    type: ActionType.ROSTERS_GET_SUCCESS;
    payload: ItemData[];
}

type ItemData = {
    rosterID: number;
    orgID: number;
    guardID: number;
    siteID: number;
    siteName: string;
    siteAddress: string;
    notes: string;
    rosterStart: string;
    rosterEnd: string;
    rosterHours: number;
};

interface RosterErrorAction {
    type: ActionType.ROSTERS_GET_FAILED;
    payload: string;
}

interface UpcomingRostersInit {
    type: ActionType.UPCOMING_ROSTERS_INIT;
}

interface UpcomingRosterSuccessAction {
    type: ActionType.UPCOMING_ROSTERS_GET_SUCCESS;
    payload: ItemData[];
}

interface UpcomingRosterErrorAction {
    type: ActionType.UPCOMING_ROSTERS_GET_FAILED;
    payload: string;
}

export type Action =
    | RostersInit
    | RosterSuccessAction
    | RosterErrorAction
    | UpcomingRostersInit
    | UpcomingRosterSuccessAction
    | UpcomingRosterErrorAction;
