import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';
// @ts-ignore
import styled from 'styled-components/native';
import { MainParentWrapper } from '@root/utils/globalStyle';
import { useActions } from '@root/hooks/useActions';
import { reportsData } from '@root/utils/common-methods';
import { navigationRef } from '@root/navigation/RootNavigation';
import navigationStrings from '@root/navigation/navigationStrings';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useTheme } from 'styled-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface CaseActiveShiftItem
    extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    onRemove?: (item: any) => void;
    shiftReportData: any;
    shiftItem: any;
}

const CaseActiveShiftItem: React.FC<CaseActiveShiftItem> = ({
    shiftReportData,
    shiftItem,
    simultaneousHandlers,
    onRemove,
}) => {
    const {
        openModal,
        setShiftReportEntryID,
        deleteReportEntry,
        getShiftsReportsEntries,
        setMultiStep,
    } = useActions();
    const d = shiftItem.shiftStart.split('T')[1].split(':');
    let hours =
        new Date().getHours().toString().length === 1
            ? '0' + new Date().getHours()
            : new Date().getHours();
    let minute =
        new Date().getMinutes().toString().length === 1
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes();
    const [time, setTime] = useState<any>(hours + ':' + minute);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { colors }: any = useTheme();

    return (
        <MainParentWrapper>
            <ShiftCode fontSize={fontSizeState}>{shiftItem.notes}</ShiftCode>
            <ShiftItemHorizontal>
                <ShiftStartTimeEndTime fontSize={fontSizeState}>
                    Shift:{' '}
                </ShiftStartTimeEndTime>
                <ShiftCode fontSize={fontSizeState}>
                    {d[0]}
                    {':'}
                    {d[1]}
                </ShiftCode>
            </ShiftItemHorizontal>
            <ShiftItemHorizontal>
                <ShiftText fontSize={fontSizeState}>
                    Shift Report Entries
                </ShiftText>
                <TouchableOpacity
                    onPress={() =>
                        openModal('ReportsEntryList', {
                            data: reportsData,
                            height: '75%',
                        })
                    }>
                    <AddImage
                        source={require('@root/assets/Vector/Vector.png')}
                    />
                </TouchableOpacity>
            </ShiftItemHorizontal>

            <SwipeListView
                data={shiftReportData}
                renderItem={(i) => {
                    let item = i.item;
                    const d = item.reportDateTime.split('T')[1].split(':');
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                {
                                    setShiftReportEntryID({
                                        id: item.shiftReportID,
                                    });
                                    if (item.categoryName === 'Patrol') {
                                        navigationRef.current.navigate(
                                            navigationStrings.PATROL,
                                            {
                                                editable: true,
                                                item,
                                            },
                                        );
                                    } else if (
                                        item.categoryName === 'Intoxication'
                                    ) {
                                        // alert(item.categoryName)
                                        navigationRef.current.navigate(
                                            navigationStrings.INTOXICATION,
                                            {
                                                editable: true,
                                                item,
                                            },
                                        );
                                    } else if (
                                        item.categoryName === 'Crowd Count'
                                    ) {
                                        navigationRef.current.navigate(
                                            navigationStrings.CROWDCOUNT,
                                            {
                                                editable: true,
                                                item,
                                            },
                                        );
                                    } else if (
                                        item.categoryName === 'Boat Report'
                                    ) {
                                        navigationRef.current.navigate(
                                            navigationStrings.BOAT_REPORT,
                                            {
                                                editable: true,
                                                item,
                                            },
                                        );
                                    } else if (
                                        item.categoryName === 'Welfare Check'
                                    ) {
                                        navigationRef.current.navigate(
                                            navigationStrings.WELFARE_CHECK,
                                            {
                                                editable: true,
                                                item,
                                            },
                                        );
                                    } else if (
                                        item.categoryName === 'Vehicle Report'
                                    ) {
                                        navigationRef.current.navigate(
                                            navigationStrings.VEHICLE_REPORT,
                                            {
                                                editable: true,
                                                item,
                                            },
                                        );
                                    } else if (
                                        item.categoryName === 'Fire Alarm'
                                    ) {
                                        navigationRef.current.navigate(
                                            navigationStrings.FIRE_ALARM,
                                            {
                                                editable: true,
                                                trigger: 1,
                                                item,
                                            },
                                        );
                                    } else if (
                                        item.categoryName === 'Armed Holdup'
                                    ) {
                                        navigationRef.current.navigate(
                                            navigationStrings.ARMED_HOLDUP_1,
                                            {
                                                editable: true,
                                                trigger: 1,
                                                item,
                                            },
                                        );
                                    } else if (
                                        item.categoryName === 'Bomb Threat'
                                    ) {
                                        navigationRef.current.navigate(
                                            navigationStrings.BOMB_THEART_STEP_1,
                                            {
                                                editable: true,
                                                trigger: 1,
                                                item,
                                            },
                                        );
                                    } else if (
                                        item.categoryName ===
                                        'Accident / Incident / Hazard'
                                    ) {
                                        navigationRef.current.navigate(
                                            navigationStrings.ACCIDENT_STEP_1,
                                            {
                                                editable: true,
                                                trigger: 1,
                                                item,
                                            },
                                        );
                                    } else if (
                                        item.categoryName === 'Maintenance'
                                    ) {
                                        navigationRef.current.navigate(
                                            navigationStrings.MAINTENANCE,
                                            {
                                                editable: true,
                                                trigger: 1,
                                                item,
                                            },
                                        );
                                    }
                                }
                            }}>
                            <ItemLayout>
                                <ItemHorizontal1>
                                    <Timeicon
                                        source={require('@root/assets/clock/clock.png')}
                                    />
                                    <StartEndTimeCategory
                                        fontSize={fontSizeState}
                                        numberOfLines={1}>
                                        {d[0]}
                                        {':'}
                                        {d[1]}- {item.categoryName}
                                    </StartEndTimeCategory>
                                </ItemHorizontal1>
                                <ShiftStartTimeEndTime
                                    fontSize={fontSizeState}
                                    numberOfLines={1}
                                    style={{ marginTop: 3 }}>
                                    {item.description}
                                </ShiftStartTimeEndTime>
                            </ItemLayout>
                        </TouchableOpacity>
                    );
                }}
                rightOpenValue={-50}
                renderHiddenItem={(data, rowMap) => (
                    <DeleteView>
                        <TouchableOpacity
                            onPress={async () => {
                                await deleteReportEntry({
                                    id: data.item.shiftReportID,
                                });
                                getShiftsReportsEntries({
                                    id: shiftItem.shiftID,
                                });
                            }}>
                            <Image
                                source={require('@root/assets/delete/delete.png')}
                            />
                        </TouchableOpacity>
                    </DeleteView>
                )}></SwipeListView>
        </MainParentWrapper>
    );
};

export default CaseActiveShiftItem;

type FontSizeProps = {
    fontSize: number;
};

const DeleteView = styled.View`
    width: auto;
    height: 100%;
    max-height: 68px;
    justify-content: center;
    align-items: flex-end;
    border-radius: 8px;
    padding: 14px 14px 14px 14px;
    background-color: ${({ theme }: any) => theme.colors.secondary};
`;

const StartEndTimeCategory = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardSubTitle};
    margin-right: 10px;
`;

const ShiftStartTimeEndTime = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardSubTitle};
`;

const ShiftCode = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.accentColor};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
`;

const Timeicon = styled.Image`
    margin-right: 8px;
`;

const ItemHorizontal1 = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ItemLayout = styled.View`
    background: ${({ theme }: any) => theme.colors.primary};
    border-radius: 8px;
    padding: 14px 0 14px 14px;
    display: flex;
    flex-direction: column;
    margin-top: 0px;
    margin-bottom: 8px;
    max-height: 68px;
`;

const AddImage = styled.Image`
    margin-left: 8px;
`;

const ShiftText = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardSubTitle};
    font-weight: 600;
    margin: 10px 0;
`;

const ShiftItemHorizontal = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    align-items: center;
`;
