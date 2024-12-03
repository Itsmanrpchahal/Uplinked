import { Dimensions, Platform } from 'react-native';

export const WINDOW_DEVICE_WIDTH = Dimensions.get('window').width;
export const WINDOW_DEVICE_HEIGHT = Dimensions.get('window').height;
export const IS_IOS = Platform.OS === 'ios';
export const SHIFT_ID = 'SHIFT_ID';
export const LATITUDE = 'LATITUDE';
export const LONGITUDE = 'LONGITUDE';
export const CURRENT_TIME = 'CURRENT_TIME';
export const CHECKPOINT_ID = 'CHECKPOINT_ID'
export const MODE_TYPE = 'MODE_TYPE'
export const ACCOUNTS = 'accounts'