import GetLocation from 'react-native-get-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import Geolocation from '@react-native-community/geolocation';

export const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday', 
];

export const appVersion = 'V1.0.3'
export const reportsData = [
    {
        name: 'Patrol',
    },
    {
        name:'Maintenance',
    },
    {
        name: 'Accident/Incident/Hazard',
    },
    {
        name: 'Welfare Check',
    },
    {
        name: 'Fire Alarm',
    },
    {
        name: 'Intoxication',
    },
    {
        name: 'Vehicle Report',
    },
    {
        name: 'Crowd Count',
    },
    {
        name: 'Bomb Threat',
    },
    {
        name: 'Boat Report',
    },
    {
        name: 'Armed Holdup',
    },
];
 
export const getUserLocation = () =>
    new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(info => resolve(info));
        
        // GetLocation.getCurrentPosition({
        //     enableHighAccuracy: true,
        //     timeout: 15000,
        // })
        //     .then((location) => {
        //         resolve(location);
        //     })
        //     .catch((error) => {
        //         const { code, message } = error;
        //         return reject(error);
        //     });
    });

export  const getNetworkState = () =>
    new Promise((resolve,reject) => {
        NetInfo.addEventListener((networkState) => {
            resolve(networkState)
        });
    })

export const getscannedData = () =>
    new Promise((resolve) => {
        AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
            // @ts-ignore
            resolve(asyncStorageRes)
        }).catch(() => {

        });
    });

export const actionsButtonIcons = [
    {
        icon: require('@root/assets/scan/scan.png'),
        name: 'bt_accessibility',
        position: 1,
    },
];
