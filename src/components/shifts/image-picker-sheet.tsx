import React, { useState } from 'react';
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
// @ts-ignore
import { bottomSheetRef } from '@root/store/global_modal/manager';
// @ts-ignore
import styled from 'styled-components/native';
import { Action } from '../../store/putOfflineUploadAttachmentShiftReportsEntries/actions';
import { Dispatch } from 'redux';
import { withTheme } from 'styled-components';
import PrimaryButton from '../Button';
import TextField from '@root/components/TextField';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { useNetInfo } from '@react-native-community/netinfo';
import { ActionType_Offline_Upload_Attachment } from '../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';

const ImagePickerSheet = (props: any) => {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const {
        uploadAttachmentShiftReportsEntries,
        closeModal,
        getShiftsReportsEntrieAttachments,
        putOfflineUploadAttachmentShiftReportEntries,
    } = useActions();
    const netInfo = useNetInfo();

    const {
        offlineUploadAttachmentShiftListData,
        loading_offlineUploadAttachmentShift,
    } = useTypedSelector((state) => state.offlineUploadAttachmentShiftListData);

    const [imagePath, setImagePath] = useState<any>(null);
    const { uploadAttachmentReportEntryLoading, shiftReportEntryID } =
        useTypedSelector((state) => state.shiftReports);
    const orgID = useTypedSelector((state) => state.auth.orgID);

    const saveImage = async (values: any) => {
        if (imagePath === null) {
            alert('Image path error');
        } else {
            const formData = new FormData();
            let osPath =
                Platform.OS === 'android'
                    ? imagePath.path
                    : imagePath.path.replace('file://', '');

            formData.append('file', {
                // @ts-ignore
                uri: osPath,
                type: 'image/jpeg',
                name: 'photo.png',
            });
            formData.append('entityId', props.shiftReportID);
            formData.append('description', values.description);

            if (props.shiftReportID === 0) {
                putOfflineUploadAttachmentShiftReportEntries(formData);
                closeModal();
            } else {
                await uploadAttachmentShiftReportsEntries(formData);
                closeModal();
                getShiftsReportsEntrieAttachments({
                    id: shiftReportEntryID,
                    orgID: orgID,
                });
            }
        }
    };

    return (
        <ScrollView>
            <CustomMainWrapper>
                <Formik
                    initialValues={{
                        description: '',
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        await saveImage(values);
                        bottomSheetRef.current.close();
                    }}>
                    {({ setFieldValue, handleSubmit, errors, values }) => (
                        <SheetContentWrapper>
                            <HeaderTextLayout>
                                <HeaderText fontSize={fontSizeState}>
                                    Add Image
                                </HeaderText>
                            </HeaderTextLayout>

                            <TabHorizontal>
                                <HorizotalCol>
                                    <TouchableOpacity
                                        onPress={() => {
                                            ImagePicker.openCamera({
                                                cropping: false,
                                                compressImageQuality:
                                                    Platform.OS === 'android'
                                                        ? 0.5
                                                        : 0.8,
                                                mediaType: 'photo',
                                                forceJpg: true,
                                            }).then((image) => {
                                                setImagePath(image);
                                            });
                                        }}>
                                        <Tabs>
                                            <ImageBT>
                                                <AddImage
                                                    source={require('@root/assets/cameracolor/cameracolor.png')}></AddImage>
                                                <TabsText
                                                    fontSize={fontSizeState}>
                                                    Click Image
                                                </TabsText>
                                            </ImageBT>
                                        </Tabs>
                                    </TouchableOpacity>
                                </HorizotalCol>

                                <HorizotalCol>
                                    <TouchableOpacity
                                        onPress={() => {
                                            ImagePicker.openPicker({
                                                cropping: false,
                                                compressImageQuality:
                                                    Platform.OS === 'android'
                                                        ? 1
                                                        : 0.8,
                                                mediaType: 'photo',
                                                forceJpg: true,
                                            }).then(async (image) => {
                                                setImagePath(image);
                                            });
                                        }}>
                                        <Tabs
                                            style={{
                                                backgroundColor: '#F18122',
                                            }}>
                                            <ImageBT>
                                                <AddImage
                                                    source={require('@root/assets/gallerywhite/gallerywhite.png')}></AddImage>
                                                <TabsText1
                                                    fontSize={fontSizeState}>
                                                    Gallery
                                                </TabsText1>
                                            </ImageBT>
                                        </Tabs>
                                    </TouchableOpacity>
                                </HorizotalCol>
                            </TabHorizontal>

                            <ImageSelect
                                source={{
                                    uri:
                                        imagePath !== null
                                            ? imagePath.path
                                            : '',
                                }}
                            />

                            <TextFieldWrapper>
                                <TextField
                                    accessibilityLabel="Description"
                                    onChangeText={(value: any) => {
                                        setFieldValue('description', value);
                                    }}
                                    placeholder="Enter Description"
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    multiline={true}
                                    fontSize={fontSizeState}
                                    value={values.description}
                                    style={{
                                        minHeight: 60,
                                    }}
                                />
                            </TextFieldWrapper>

                            <ButtonWrapper>
                                <PrimaryButton
                                    onPress={() => handleSubmit()}
                                    loading={uploadAttachmentReportEntryLoading}
                                    btnText={'Save'}
                                />
                            </ButtonWrapper>
                        </SheetContentWrapper>
                    )}
                </Formik>
            </CustomMainWrapper>
        </ScrollView>
    );
};

export default withTheme(ImagePickerSheet);

type FontSizeProps = {
    fontSize: number;
};

const TextFieldWrapper = styled.View`
    margin-bottom: 16px;
`;

const ButtonWrapper = styled.View`
    margin-bottom: 40px;
`;

const SheetContentWrapper = styled.View`
    margin-left: 16px;
    margin-right: 16px;
`;

const CustomMainWrapper = styled.View`
    flex: 1;
    background-color: ${({ theme }: any) => theme.colors.secondary};
`;

const TabsText = styled.Text<FontSizeProps>`
    padding-left: 12px;
    color: #f18122;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardSubTitle}px;
    font-weight: 400;
    letter-spacing: -0.41px;
`;

const AddImage = styled.Image``;

const HeaderTextLayout = styled.View`
    padding: 16px;
`;

const HeaderText = styled.Text<FontSizeProps>`
    color: #fff;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    font-weight: 600;
`;

const TabHorizontal = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
    justify-content: space-between;
`;

const HorizotalCol = styled.View`
    width: 48%;
`;

const Tabs = styled.View`
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    height: 50px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    background-color: #28303d;
`;

const ImageBT = styled.View`
    flex-direction: row;
    align-items: center;
`;

const TabsText1 = styled.Text`
    padding-left: 12px;
    color: #000000;
    font-weight: 400;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardSubTitle}px;
    letter-spacing: -0.41px;
`;

const ImageSelect = styled.Image`
    height: 145px;
    border-radius: 8px;
    background: #000000;
    margin-bottom: 16px;
`;
