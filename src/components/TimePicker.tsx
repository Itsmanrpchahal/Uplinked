import React, { useState } from 'react';
import { Button, Platform, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type CustomTimePickerProps = {
    showDateTimePicker: boolean;
    setDateTimePicker: (value: boolean) => void;
    handlePickerData: (date: any) => void;
    mode?:'date';
    time?:'',
    maxDate?:''
};

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
    showDateTimePicker = false,
    handlePickerData,
    setDateTimePicker,
    mode,
    time,
    maxDate
}) => {
    const hideTimePicker = () => {
        setDateTimePicker(false);
    };

    const setTimeValue = (date: any) => {
        handlePickerData(date);
        setDateTimePicker(false);
    };

    const getDateObj = (date:string) => {
        let now = new Date(date);
        return Platform.OS==='ios'? new Date(now.getTime()) : new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    }

    return (
        <View>
            <DateTimePickerModal
                isVisible={showDateTimePicker}
                mode={mode==='date' ?'date':'time'}
                date={time === '' ? new Date() : getDateObj(time)}
                onConfirm={setTimeValue}
                onCancel={hideTimePicker}
            />
        </View> 
    );
};

export default CustomTimePicker;
