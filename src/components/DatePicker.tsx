import React from 'react';
import {Platform,View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type CustomDatePickerProps = {
    showDateTimePicker: boolean;
    setDateTimePicker: (value: boolean) => void;
    handlePickerData: (date: any) => void;
    mode?: 'date';
    date?: any,
    maxDate?: ''
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    showDateTimePicker = false,
    handlePickerData,
    setDateTimePicker,
    mode,
    date,
    maxDate
}) => {
    const hideTimePicker = () => {
        setDateTimePicker(false);
    };

    const setTimeValue = (date: any) => {
        handlePickerData( date);
        setDateTimePicker(false);
    };

    const getDateObj = (date: string) => {
        let now = new Date(date);
        return Platform.OS==='ios'? new Date(now.getTime()) : new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    }

    return (
        <View>
            <DateTimePickerModal
                isVisible={showDateTimePicker}
                locale='en_GB'
                mode={'date'}
                date={date === '' ? new Date() : getDateObj(date)}
                onConfirm={setTimeValue}
                onCancel={hideTimePicker}
                maximumDate={new Date()}
            />
        </View>
    );
};

export default CustomDatePicker;
