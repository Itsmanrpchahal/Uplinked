export interface ShiftCheckPointsInterface {
    id: string
}

export type RepositoriesStateResponse = {
    checkpointID: number;
    checkpoint: string;
    scannedDateTime: string;
};

export type ScannedCheckedPointsInterface = {
    orgID: string,
    item: {
        shiftID: string;
        checkpointCode: string;
        scannedDateTime: string;
        geoLocation: {
            latitude: number;
            longitude: number
        }
    }

}
