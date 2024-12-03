import { assetsData } from 'utils/assets';

type screenType = {
    screenName: string;
    lightKey: string;
    darkKey: string;
    appearance: string;
};
export const returnThemeTypeData = (types: screenType) => {
    if (assetsData.hasOwnProperty(types.screenName)) {
        if (types.appearance === 'dark') {
            return assetsData[types.screenName][types.darkKey];
        } else {
            return assetsData[types.screenName][types.lightKey];
        }
    }
};
