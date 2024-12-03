import React, { useCallback, useMemo, useEffect, useRef } from 'react';

import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
// @ts-ignore
import styled from 'styled-components/native';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { useActions } from '@root/hooks/useActions';
import { ScrollView, Text, View } from 'react-native';
// @ts-ignore
import {
    AccountModalSheet,
    RosterView,
    ReportsEntryList,
    ImagePickerSheet,
    ShiftAttachmentSheet,
    MessageFilesSheet,
} from './modal';
import { useTheme } from 'styled-components';

const ModalManager = () => {
    const { closeModal } = useActions();
    const bottomSheetRef = useRef(null);
    const { colors }: any = useTheme();
    /**
     * * @{ get current modal }
     */
    const { modalType, modalProps } = useTypedSelector(
        (state) => state.modalSheet,
    );

    useEffect(() => {
        if (modalProps !== null) {
            // @ts-ignore
            bottomSheetRef.current.expand();
        } else {
            // @ts-ignore
            bottomSheetRef.current.close();
        }
    }, [modalProps]);

    // variables
    const snapPoints = useMemo(
        () => [
            '0%',
            modalProps !== null && modalProps.hasOwnProperty('height')
                ? modalProps.height
                : '70%',
        ],
        [modalProps],
    );

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        if (index === 0) {
            closeModal();
        }
    }, []);

     // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

    let renderedModal;
    if (modalType !== null) {
        const ModalComponent = modalLookup[modalType];
        renderedModal = <ModalComponent {...modalProps} />;
        if (modalProps !== null) {
            return (
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    animateOnMount={true}
                    backdropComponent={renderBackdrop}
                    enableAccessibilityChangeAnnouncement={true}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}>
                    <BottomSheetScrollView
                        style={{ backgroundColor: colors.primary }}
                        showsVerticalScrollIndicator={false}>
                        {renderedModal}
                    </BottomSheetScrollView>
                </BottomSheet>  
            );
        }
    }
    {
        return (
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <View></View>
            </BottomSheet>
        );
    }
};

export default ModalManager;

export const WelcomeModal = (props: any) => {
    return (
        <WelcomeModalWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <WelcomeModalWrapper__Content>
                    Welcome {JSON.stringify(props, null, 2)}
                </WelcomeModalWrapper__Content>
            </ScrollView>
        </WelcomeModalWrapper>
    );
};

const modalLookup: any = {
    WelcomeModal,
    AccountModalSheet,
    RosterView,
    ReportsEntryList,
    ImagePickerSheet,
    ShiftAttachmentSheet,
    MessageFilesSheet,
};

const WelcomeModalWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const WelcomeModalWrapper__Content = styled.Text``;

const SheetView = styled.View`
    display: flex;
`;
